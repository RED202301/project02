package com.ssafish.web;

import com.ssafish.common.util.WebSocketSubscriberManager;
import com.ssafish.service.GameService;
import com.ssafish.service.RoomService;
import com.ssafish.web.dto.Board;
import com.ssafish.web.dto.GameData;
import com.ssafish.web.dto.Player;
import com.ssafish.web.dto.TypeEnum;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.AbstractSubProtocolEvent;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.io.IOException;
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

    private final WebSocketSubscriberManager subscriberManager;
    private final RoomService roomService;
    private final GameService gameService;

    private final SimpMessageSendingOperations messagingTemplate;
    private final long DISCONNECT_DELAY = 5_000;
    private TaskScheduler taskScheduler = new ConcurrentTaskScheduler();
    private Map<String, ScheduledFuture<?>> disconnectTasks = new ConcurrentHashMap<>();

    @Override
    public void onApplicationEvent(AbstractSubProtocolEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();

        if (event instanceof SessionDisconnectEvent) {
            log.info("DISCONNECT");
            if (subscriberManager.isExist(sessionId)) {
                System.out.println("EXIST");
                ScheduledFuture<?> disconnectTask = taskScheduler.schedule(() -> {
                    handleDisconnect(sessionId);
                }, new Date(System.currentTimeMillis() + DISCONNECT_DELAY));

                disconnectTasks.put(sessionId, disconnectTask);
            }
        } else if (event instanceof SessionConnectEvent) {
            log.info("CONNECT");
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
            roomService.sendMessageToRoom(roomId, player.getNickname() + "님이 로봇이 되었습니다!");
        } else {
            playerList.remove(player);
            log.info("대기실에서 퇴장 처리된 플레이어 userId: " + player.getUserId());
            roomService.sendMessageToRoom(roomId, player.getNickname() + "님이 방을 나갔습니다!");
        }
        log.info("현재 대기실(게임방) 인원 수: " + playerList.size());

        if (room.getUserId() == player.getUserId()) { // 방장이 퇴장한 경우
            List<Player> personList = playerList.stream().filter(e -> !e.isBot()).collect(Collectors.toList());
            if (personList.size() == 0) { // 없는 경우 -> 방 폭파
                gameService.deleteGameRoom(roomId);
                roomService.deleteById(roomId);
                log.info("삭제된 방 번호: " + roomId);
            } else { // 방에 잔여 인원이 있는 경우 -> 그 사람 중 하나를 방장으로
                Player newLeader = personList.get((int) (Math.random() * personList.size()));
                room.setUserId(newLeader.getUserId());
                messagingTemplate.convertAndSend("/sub/" + roomId, GameData.builder()
                        .type(TypeEnum.ROOM_LEADER.name())
                        .player(newLeader.getUserId())
                        .build());
                log.info(roomId + "번 방의 새로운 방장 userId: " + newLeader.getUserId());
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