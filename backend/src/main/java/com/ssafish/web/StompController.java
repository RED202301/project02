package com.ssafish.web;

import com.ssafish.service.GameRoomService;
import com.ssafish.web.dto.SocketData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Controller
public class StompController {

    private final GameRoomService gameRoomService;

    @MessageMapping("/msg/{roomId}")
    @SendTo("/sub/{roomId}")
    public SocketData sendMsg(@DestinationVariable int roomId, @Payload SocketData data, @Headers Map<String, Object> attributes) throws Exception {
        Thread.sleep(1000); // simulated delay


        return data;
    }

    @MessageMapping("/enter/{roomId}")
    @SendTo("/sub/{roomId}")
    public SocketData processClientEntrance(@DestinationVariable int roomId, @Payload SocketData data,
                                            @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

        Integer userId = data.getUserId();
        String sessionId = headerAccessor.getSessionId();
        log.info(roomId + " " + userId + " " + sessionId);
        gameRoomService.processClientEntrance(roomId, userId, sessionId);

        return data;
    }

}