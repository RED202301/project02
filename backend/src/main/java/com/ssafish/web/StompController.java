package com.ssafish.web;

import com.ssafish.service.RoomService;
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

    private final RoomService gameRoomService;

    @MessageMapping("/msg/{roomId}")
    @SendTo("/sub/{roomId}")
    public SocketData sendMsg(@DestinationVariable long roomId, @Payload SocketData data, @Headers Map<String, Object> attributes) throws Exception {

        return data;
    }

    @MessageMapping("/enter/{roomId}")
    @SendTo("/sub/{roomId}")
    public SocketData processClientEntrance(@DestinationVariable long roomId, @Payload SocketData data,
                                            @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

        Long userId = data.getUserId();
        String sessionId = headerAccessor.getSessionId();
        log.info(roomId + " " + userId + " " + sessionId);
        gameRoomService.processClientEntrance(roomId, userId, sessionId);
        data.setContent("님의 접속을 환영합니다!");
        return data;
    }

}