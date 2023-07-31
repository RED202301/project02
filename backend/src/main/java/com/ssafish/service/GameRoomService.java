package com.ssafish.service;

import com.ssafish.common.util.WebSocketSubscriberManager;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class GameRoomService {

    private final WebSocketSubscriberManager subscriberManager;
    private final SimpMessageSendingOperations messagingTemplate;

    public void sendMessageToRoom(Integer roomId, String message) throws IOException {
        Map<Integer, String> sessionIds = subscriberManager.getRoomById(roomId);
        sessionIds.entrySet().parallelStream().forEach(entry -> {
            String sessionId = entry.getValue();
            messagingTemplate.convertAndSendToUser(sessionId, "/sub/" + roomId, message);
        });
    }
}
