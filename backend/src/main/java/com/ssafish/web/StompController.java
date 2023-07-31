package com.ssafish.web;

import com.ssafish.service.GameRoomService;
import com.ssafish.web.dto.SocketData;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.Map;

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
    public SocketData processClientEntrance(@DestinationVariable int roomId, @Payload SocketData data) throws Exception {
        return data;
    }

}