package com.ssafish.web;

import com.ssafish.service.GameService;
import com.ssafish.web.dto.GameData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
public class GameController {

    private final GameService gameService;

    @MessageMapping("/{roomId}/gamestart")
    @SendTo("/sub/{roomId}")
    public GameData gameStart(@DestinationVariable long roomId, @Payload GameData data,
                              @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

        String type = data.getType();

//        String sessionId = headerAccessor.getSessionId();
//        log.info(roomId + " " + type + " " + sessionId);

//        gameService.dfdfdfd(type, );

        // 카드

        // sub data
        data.setType("GAME_START");
//        data.setCards();

        return data;
    }


    @MessageMapping("/{roomId}/personchoose")
    @SendTo("/sub/{roomId}")
    public GameData personChoose(@DestinationVariable long roomId, @Payload GameData data,
                                 @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

        String type = data.getType();

//        String sessionId = headerAccessor.getSessionId();
//        log.info(roomId + " " + type + " " + sessionId);

//        gameService.dfdfdfd(type, );

        // 카드

        // sub data
        data.setType("PERSON_CHOOSE");
//        data.setCards();

        return data;
    }



    @MessageMapping("/{roomId}/cardchoose")
    @SendTo("/sub/{roomId}")
    public GameData cardChoose(@DestinationVariable long roomId, @Payload GameData data,
                               @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

        String type = data.getType();

//        String sessionId = headerAccessor.getSessionId();
//        log.info(roomId + " " + type + " " + sessionId);

//        gameService.dfdfdfd(type, );

        // 카드

        // sub data
        data.setType("CARD_CHOOSE");
//        data.setCards();

        return data;
    }


    @MessageMapping("/{roomId}/replychoose")
    @SendTo("/sub/{roomId}")
    public GameData replyChoose(@DestinationVariable long roomId, @Payload GameData data,
                                @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

        String type = data.getType();

//        String sessionId = headerAccessor.getSessionId();
//        log.info(roomId + " " + type + " " + sessionId);

//        gameService.dfdfdfd(type, );

        // 카드

        // sub data
        data.setType("REPLY_CHOOSE");
//        data.setCards();

        return data;
    }
}
