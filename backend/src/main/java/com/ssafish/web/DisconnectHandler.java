package com.ssafish.web;

import com.ssafish.common.util.WebSocketSubscriberManager;
import com.ssafish.service.GameService;
import com.ssafish.web.dto.Board;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.AbstractSubProtocolEvent;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;

@Slf4j
@RequiredArgsConstructor
@Component
public class DisconnectHandler implements ApplicationListener<AbstractSubProtocolEvent> {

    private final WebSocketSubscriberManager subscriberManager;
    private final GameService gameService;
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
                ScheduledFuture<?> disconnectTask = taskScheduler.schedule(() -> handleDisconnect(sessionId), new Date(System.currentTimeMillis() + DISCONNECT_DELAY));
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
        log.info("handle disconnect: " + sessionId);
        subscriberManager.removeSubscriber(sessionId);
        log.info("Client with sessionId " + sessionId + " disconnected.");
        disconnectTasks.remove(sessionId);

        long roomId = subscriberManager.getRoomIdBySessionId(sessionId);
        long userId = subscriberManager.getUserIdBySessionId(sessionId);
        Board room = gameService.getGameRoomByRoomId(roomId);
    }

    public void cancelDisconnectTask(String sessionId) {
        ScheduledFuture<?> disconnectTask = disconnectTasks.get(sessionId);
        if (disconnectTask != null) {
            disconnectTask.cancel(true);
            disconnectTasks.remove(sessionId);
        }
    }
}