package com.ssafish.service;

import com.ssafish.common.util.WebSocketSubscriberManager;
import com.ssafish.web.dto.SocketData;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.Payload;
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
        if (sessionIds == null) {
            System.out.println("TT");
            return;
        }
        messagingTemplate.convertAndSend("/sub/" + roomId, new SocketData(77, message));
    }

    public void processClientEntrance(Integer roomId, Integer userId, String sessionId) {
        subscriberManager.addSubscriber(roomId, userId, sessionId);
    }
}
