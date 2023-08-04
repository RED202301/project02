package com.ssafish.web;

import com.ssafish.web.dto.Board;
import com.ssafish.web.dto.GameData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Slf4j
@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
public class GameController {

    private final Map<Long, Board> boards = new ConcurrentHashMap<>();
    protected ScheduledExecutorService turnTimer;

    @MessageMapping("/{roomId}/gamestart")
    public void gameStart(@DestinationVariable long roomId, @Payload GameData data,
                              @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

//        String type = data.getType();
//        Board board = boards.get(roomId);
//        if (board != null) {
//            turnTimer = Executors.newSingleThreadScheduledExecutor();
//            turnTimer.schedule(board::play, 1, TimeUnit.SECONDS);
//        }
    }


    @MessageMapping("/{roomId}/personchoose")
    public void personChoose(@DestinationVariable long roomId, @Payload GameData data,
                             @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

//        String type = data.getType();
//        Board board = boards.get(roomId);
//        if (board != null) {
//            turnTimer = Executors.newSingleThreadScheduledExecutor();
//            turnTimer.schedule(board::play, 1, TimeUnit.SECONDS);
//        }

    }


    @MessageMapping("/{roomId}/cardchoose")
    public void cardChoose(@DestinationVariable long roomId, @Payload GameData data,
                           @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

//        String type = data.getType();
//        Board board = boards.get(roomId);
//        if (board != null) {
//            turnTimer = Executors.newSingleThreadScheduledExecutor();
//            turnTimer.schedule(board::play, 1, TimeUnit.SECONDS);
//        }
    }


    @MessageMapping("/{roomId}/replychoose")
    public void replyChoose(@DestinationVariable long roomId, @Payload GameData data,
                            @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

//        String type = data.getType();
//        Board board = boards.get(roomId);
//        if (board != null) {
//            turnTimer = Executors.newSingleThreadScheduledExecutor();
//            turnTimer.schedule(board::play, 1, TimeUnit.SECONDS);
//        }
    }
}
