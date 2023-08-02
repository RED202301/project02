package com.ssafish.service;


import com.ssafish.common.util.WebSocketSubscriberManager;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class GameService {

    private final WebSocketSubscriberManager subscriberManager;
    private final SimpMessageSendingOperations messagingTemplate;


}