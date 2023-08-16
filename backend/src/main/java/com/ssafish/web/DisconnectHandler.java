package com.ssafish.web;

import com.ssafish.common.util.TimeManager;
import com.ssafish.common.util.WebSocketSubscriberManager;
import com.ssafish.service.GameService;
import com.ssafish.service.RoomService;
import com.ssafish.service.UserService;
import com.ssafish.web.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.config.WebSocketMessageBrokerStats;
import org.springframework.web.socket.messaging.AbstractSubProtocolEvent;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import javax.annotation.PostConstruct;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Component
public class DisconnectHandler implements ApplicationListener<AbstractSubProtocolEvent> {

    private final WebSocketMessageBrokerStats brokerStats;
    private final WebSocketSubscriberManager subscriberManager;
    private final RoomService roomService;
    private final GameService gameService;
    private final UserService userService;
    private final TimeManager timeManager;

    private final long DISCONNECT_DELAY = 5_000;
    private TaskScheduler taskScheduler = new ConcurrentTaskScheduler();
    private Map<String, ScheduledFuture<?>> disconnectTasks = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {
        brokerStats.setLoggingPeriod(10_000L);
    }

    @Override
    public void onApplicationEvent(AbstractSubProtocolEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();

        if (event instanceof SessionDisconnectEvent) {
            log.info("DISCONNECT 된 session ID: " + sessionId);
            if (subscriberManager.isExist(sessionId)) {
                log.info("subscriberManager 에 의해 관리되고 있는 session ID: " + sessionId);
                ScheduledFuture<?> disconnectTask = taskScheduler.schedule(
                        () -> handleDisconnect(sessionId),
                        new Date(System.currentTimeMillis() + DISCONNECT_DELAY)
                );

                disconnectTasks.put(sessionId, disconnectTask);
            }
        } else if (event instanceof SessionConnectEvent) {
            log.info("CONNECT 된 session ID: " + sessionId);
            log.info(brokerStats.getWebSocketSessionStatsInfo());
            if (subscriberManager.isExist(sessionId) && disconnectTasks.get(sessionId) != null) {
                cancelDisconnectTask(sessionId);
            }
        }
    }

    private void handleDisconnect(String sessionId) {
        log.info("연결이 끊긴 클라이언트의 session ID: " + sessionId);
        disconnectTasks.remove(sessionId);

        long roomId = subscriberManager.getRoomIdBySessionId(sessionId);
        long userId = subscriberManager.getUserIdBySessionId(sessionId);
        Board room = gameService.getGameRoomByRoomId(roomId);

        // 게임방(Board) 에서 해당 플레이어 처리
        List<Player> playerList = room.getGameStatus().getPlayerList();
        Player player = playerList.stream().filter(e -> e.getUserId() == userId).findAny().orElseThrow();
        if (room.isStarted()) {
            player.setBot(true);
            log.info("봇으로 전환된 플레이어 userId: " + player.getUserId());

            roomService.sendMessageToRoom(roomId,
                    ResponseEntity.ok(MsgData.builder()
                    .type(MessageType.SERVER_MESSAGE.name())
                    .content(timeManager.getCurrentTime() + player.getNickname() + "님이 로봇이 되었습니다!")
                    .build()));
        } else {
            playerList.remove(player);
            log.info("대기실에서 퇴장 처리된 플레이어 userId: " + player.getUserId());

            roomService.sendMessageToRoom(roomId,
                    ResponseEntity.ok(MsgData.builder()
                    .type(MessageType.SERVER_MESSAGE.name())
                    .content(timeManager.getCurrentTime() + player.getNickname() + "님이 방에서 나갔습니다!")
                    .build()));
        }

        // 플레이어의 연결됨에 따른 변화 내용을 알리는 메시지 전송
        roomService.sendMessageToRoom(roomId,
                ResponseEntity.ok(GameData.builder()
                .type(MessageType.EXIT.name())
                .players(playerList)
                .build()));

        log.info(roomId + "번 방의 방장 userId: " + room.getUserId() + " " + "세션 종료된 userId: " + userId);
        if (room.getUserId() == player.getUserId()) { // 방장이 퇴장한 경우
            List<Player> personList = playerList.stream().filter(e -> !e.isBot()).collect(Collectors.toList());
            log.info("현재 대기실(게임방) 인원 수: " + personList.size());
            if (personList.size() == 0) { // 없는 경우 -> 방 폭파
                gameService.stopGame(roomId);
                gameService.deleteGameRoom(roomId);
                roomService.deleteById(roomId);
                log.info("삭제된 방 번호: " + roomId);
            } else { // 방에 잔여 인원이 있는 경우 -> 그 사람 중 하나를 방장으로
                Player newLeader = personList.get((int) (Math.random() * personList.size()));
                room.setUserId(newLeader.getUserId());
                roomService.sendMessageToRoom(roomId,
                        ResponseEntity.ok(GameData.builder()
                        .type(MessageType.ROOM_LEADER.name())
                        .player(newLeader.getUserId())
                        .build()));

                roomService.sendMessageToRoom(roomId,
                        ResponseEntity.ok(MsgData.builder()
                        .type(MessageType.SERVER_MESSAGE.name())
                        .content(timeManager.getCurrentTime()) + newLeader.getNickname() + "님이 새로운 방장입니다!"));
                log.info(roomId + "번 방의 새로운 방장 userId: " + newLeader.getUserId());
            }
        }

        // 플레이어가 손님일 경우 DB 에서 삭제
        UserResponseDto userDto = userService.findUserById(userId);
        if (Role.GUEST.name().equals(userDto.getRole())) {
            if (userService.deleteGuest(userId) != -1) {
                log.info("삭제된 게스트 userId: " + userId);
            } else {
                log.info("DB에 등록되지 않은 userId: " + userId);
            }
        }

        subscriberManager.removeSubscriber(sessionId);
    }

    public void cancelDisconnectTask(String sessionId) {
        ScheduledFuture<?> disconnectTask = disconnectTasks.get(sessionId);
        if (disconnectTask != null) {
            disconnectTask.cancel(true);
            disconnectTasks.remove(sessionId);
        }
    }
}