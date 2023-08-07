package com.ssafish.web;

import com.ssafish.service.GameService;
import com.ssafish.service.RoomService;
import com.ssafish.web.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.List;


@Slf4j
@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
public class RoomController {

    private final RoomService roomService;
    private final GameService gameService;

    static Map<String, Long> rooms = new HashMap<>();


    @PostMapping("/api/v1/room")
    public RoomResponseDto create(@RequestBody RoomRequestDto requestDto) {

        String uuid = UUID.randomUUID().toString();
        requestDto.setPinNumber(uuid);

        log.info(requestDto.toString());
        RoomResponseDto responseDto = roomService.create(requestDto);

        rooms.put(uuid, responseDto.getRoomId());
        gameService.createGameRoom(responseDto);
        log.info(responseDto.toString());
        return responseDto;
    }

    @GetMapping("/api/v1/room/id/{pinNumber}")
    public RoomResponseDto findByPinNumber(@PathVariable String pinNumber) {
        log.info(pinNumber);

        return roomService.findByPinNumber(pinNumber);
    }

    @PostMapping("/api/v1/room/msg")
    public void msgToRoom(@RequestBody MsgRequest msgRequest) throws IOException {
        log.info(msgRequest.toString());

        Long roomId = msgRequest.getRoomId();
        String content = msgRequest.getContent();
        roomService.sendMessageToRoom(roomId, content);
    }

    @MessageMapping("/enter/{roomId}")
    @SendTo("/sub/{roomId}")
    public List<Player> processClientEntrance(@DestinationVariable long roomId, @Payload SocketData data,
                                             @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

        Long userId = data.getUserId();
        String nickname = data.getNickname();
        boolean isBot = data.isBot();
        String sessionId = headerAccessor.getSessionId();
        log.info(roomId + " " + userId + " " + sessionId);

        roomService.processClientEntrance(roomId, userId, sessionId);
        gameService.addPlayer(roomId, userId, nickname, isBot);

        return gameService.getPlayerList(roomId);
    }
}
