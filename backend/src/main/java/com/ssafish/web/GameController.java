package com.ssafish.web;

import com.ssafish.web.dto.Board;
import com.ssafish.web.dto.GameData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
public class GameController {

    private final Map<Long, Board> boards = new ConcurrentHashMap<>();

    @Async
    @MessageMapping("/{roomId}/start-game")
    public void startGame(@DestinationVariable long roomId, @Payload GameData gameData,
                          @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

        boards.get(roomId).play();
    }

    @Async
    @MessageMapping("/{roomId}/select-player")
    public void selectPlayer(@DestinationVariable long roomId, @Payload GameData gameData,
                             @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

        boards.get(roomId).handlePub(gameData);
    }

    @Async
    @MessageMapping("/{roomId}/test-player")
    public void testPlayer(@DestinationVariable long roomId, @Payload GameData gameData,
                           @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

        boards.get(roomId).handlePub(gameData);
    }

    @Async
    @MessageMapping("/{roomId}/select-card")
    public void selectCard(@DestinationVariable long roomId, @Payload GameData gameData,
                           @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

        boards.get(roomId).handlePub(gameData);
    }

    @Async
    @MessageMapping("/{roomId}/reply")
    public void reply(@DestinationVariable long roomId, @Payload GameData gameData,
                      @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

        boards.get(roomId).handlePub(gameData);
    }
}
