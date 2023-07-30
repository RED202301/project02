package com.ssafish.web;

import com.ssafish.web.dto.SocketData;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class StompController {


    @MessageMapping("/msg/{roomId}")
    @SendTo("/sub/{roomId}")
    public SocketData sendMsg(@DestinationVariable int roomId, @Payload SocketData data) throws Exception {
        Thread.sleep(1000); // simulated delay
        return data;
    }

    @MessageMapping("/enter/{roomId}")
    @SendTo("/sub/{roomId}")
    public SocketData processClientEntrance(@DestinationVariable int roomId, @Payload SocketData data) throws Exception {
        return data;
    }

}