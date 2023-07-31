package com.ssafish.service;

import com.ssafish.common.util.WebSocketSubscriberManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;

@RequiredArgsConstructor
@Service
public class GameRoomService {

    private final WebSocketSubscriberManager subscriberManager;

    public void sendMessageToRoom(Integer roomId, String message) throws IOException {
        subscriberManager.sendMessageToRoom(roomId, message);
    }
}
