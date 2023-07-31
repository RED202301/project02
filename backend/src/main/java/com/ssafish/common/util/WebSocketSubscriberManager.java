package com.ssafish.common.util;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class WebSocketSubscriberManager {

    private final Map<Integer, String> entireSessions = new ConcurrentHashMap<>();
    private final Map<Integer, Map<Integer, String>> rooms = new ConcurrentHashMap<>();

    public void addSubscriber(Integer userId, String sessionId) {
        entireSessions.put(userId, sessionId);
    }

    public void removeSubscriber(Integer userId) {
        entireSessions.remove(userId);
    }
    public void addSubscriberToRoom(Integer roomId, Integer userId, String sessionId) {
        if (!rooms.containsKey(roomId)) {
            rooms.put(roomId, new ConcurrentHashMap<>());
        }
        rooms.get(roomId).put(userId, sessionId);
    }

    public void removeSubscriberFromRoom(Integer roomId, Integer userId) {
        rooms.get(roomId).remove(userId);
    }

    public Map<Integer, String> getRoomById(Integer roomId) {
        return rooms.get(roomId);
    }
    public boolean isExist(Integer roomId, Integer userId) {
        return rooms.containsKey(roomId) && rooms.get(roomId).containsKey(userId);
    }
}
