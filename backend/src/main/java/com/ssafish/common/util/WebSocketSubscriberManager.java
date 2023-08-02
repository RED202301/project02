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

    private final Map<Long, String> entireSessions = new ConcurrentHashMap<>();
    private final Map<Long, Map<Long, String>> rooms = new ConcurrentHashMap<>();
    private final Map<String, Long> roomTable = new ConcurrentHashMap<>();
    private final Map<String, Long> userTable = new ConcurrentHashMap<>();

    public void addSubscriber(Long roomId, Long userId, String sessionId) {
        entireSessions.put(userId, sessionId);
        if (!rooms.containsKey(roomId)) {
            rooms.put(roomId, new ConcurrentHashMap<>());
        }
        rooms.get(roomId).put(userId, sessionId);
        roomTable.put(sessionId, roomId);
        userTable.put(sessionId, userId);
    }

    public void removeSubscriber(String sessionId) {
        if (roomTable.containsKey(sessionId) && userTable.containsKey(sessionId)) {
            Long roomId = roomTable.get(sessionId);
            Long userId = userTable.get(sessionId);
            entireSessions.remove(userId);
            rooms.get(roomId).remove(userId);
            roomTable.remove(sessionId);
            userTable.remove(sessionId);
        }
    }

    public Map<Long, String> getRoomById(Long roomId) {
        return rooms.get(roomId);
    }
    public boolean isExist(String sessionId) {
        return roomTable.containsKey(sessionId);
    }

    public Long getRoomIdBySessionId(String sessionId) {
        return roomTable.get(sessionId);
    }

    public Long getUserIdBySessionId(String sessionId) {
        return userTable.get(sessionId);
    }
}
