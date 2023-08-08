package com.ssafish.web;

import com.ssafish.domain.Room;
import com.ssafish.service.GameService;
import com.ssafish.service.RoomService;
import com.ssafish.service.UserService;
import com.ssafish.web.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
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
    private final UserService userService;

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
    public void msgToRoom(@RequestBody MsgData msgRequest) throws IOException {
        log.info(msgRequest.toString());

        Long roomId = msgRequest.getRoomId();
        String content = msgRequest.getContent();
        roomService.sendMessageToRoom(roomId, content);
    }

    @MessageMapping("/enter/{roomId}")
    @SendTo("/sub/{roomId}")
    public ResponseEntity<Object> processClientEntrance(@DestinationVariable long roomId, @Payload SocketData data,
                                             @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

        Long userId = data.getUserId();
        String nickname = data.getNickname();
        boolean isBot = data.isBot();
        String sessionId = headerAccessor.getSessionId();
        log.info(roomId + " 번 방에 user Id " + userId + " 인 유저가 입장 -> session ID: " + sessionId);
        try {
            roomService.processClientEntrance(roomId, userId, sessionId);
            gameService.addPlayer(roomId, userId, nickname, isBot);
            return ResponseEntity.status(HttpStatus.OK).body(gameService.getPlayerList(roomId));
        } catch (IllegalStateException e) {
            log.error("Failed to add player to the room: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
    }

    @MessageMapping("/change/{roomId}")
    @SendTo("/sub/{roomId}")
    public ResponseEntity<Object> changeRoom(@DestinationVariable long roomId, @Payload RoomRequestDto requestDto,
                                                        @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {
        try {
            log.info(requestDto.toString());
            RoomResponseDto responseDto = roomService.change(requestDto, roomId);

            gameService.changeGameRoom(responseDto);
            log.info(responseDto.toString());
            return ResponseEntity.status(HttpStatus.OK).body(responseDto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
    }
}
