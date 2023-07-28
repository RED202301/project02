package com.ssafish.web;

import com.ssafish.web.dto.SocketData;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class StompController {


    @MessageMapping("/hello")
    @SendTo("/topic")
    public SocketData sendMsg(@Payload SocketData data) throws Exception {
        Thread.sleep(1000); // simulated delay
        return data;
    }

}