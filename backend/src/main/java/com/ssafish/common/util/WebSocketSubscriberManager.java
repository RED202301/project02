package com.ssafish.common.util;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class WebSocketSubscriberManager {

    private final Map<Integer, WebSocketSession> entireSessions = new ConcurrentHashMap<>();
    private final Map<Integer, Map<Integer, WebSocketSession>> rooms = new ConcurrentHashMap<>();

    public void addSubscriber(Integer userId, WebSocketSession session) {
        entireSessions.put(userId, session);
    }

    public void removeSubscriber(Integer userId) {
        entireSessions.remove(userId);
    }
    public void addSubscriberToRoom(Integer roomId, Integer userId, WebSocketSession session) {
        if (!rooms.containsKey(roomId)) {
            rooms.put(roomId, new ConcurrentHashMap<>());
        }
        rooms.get(roomId).put(userId, session);
    }

    public void removeSubscriberFromRoom(Integer roomId, Integer userId) {
        rooms.get(roomId).remove(userId);
    }

    public void sendMessageToRoom(Integer roomId, String message) throws IOException {
        Map<Integer, WebSocketSession> sessions = rooms.get(roomId);
        sessions.entrySet().parallelStream().forEach(entry -> {
            WebSocketSession session = entry.getValue();
            if (session != null && session.isOpen()) {
                try {
                    session.sendMessage(new TextMessage(message));
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        });
    }
}
