package com.ssafish.service;


import com.ssafish.common.util.WebSocketSubscriberManager;
import com.ssafish.web.dto.Board;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@Service
public class GameService {

    private final WebSocketSubscriberManager subscriberManager;
    private final SimpMessageSendingOperations messagingTemplate;
    private final Map<Long, Board> boards = new ConcurrentHashMap<>();

    public void autoDraw() {

    }
}
