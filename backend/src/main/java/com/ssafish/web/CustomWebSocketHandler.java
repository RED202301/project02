package com.ssafish.web;

import com.ssafish.common.util.WebSocketSubscriberManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@RequiredArgsConstructor
@Component
public class CustomWebSocketHandler extends TextWebSocketHandler {

    private final WebSocketSubscriberManager subscriberManager;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

    }
}
