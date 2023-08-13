package com.ssafish.web;

import com.ssafish.common.util.TimeManager;
import com.ssafish.service.GameService;
import com.ssafish.service.RoomService;
import com.ssafish.web.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
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
    private final TimeManager timeManager;

    @Transactional
    @PostMapping("/api/v1/room")
    public ResponseEntity<Object> create(@RequestBody RoomRequestDto requestDto) {

        String uuid = UUID.randomUUID().toString();
        requestDto.setPinNumber(uuid);

        log.info(requestDto.toString());

        if (requestDto.getRoomName().length() > 0 && requestDto.getCapacity() > 1 && requestDto.getTimeLimit() > 0) {
            RoomResponseDto responseDto = roomService.create(requestDto);

            gameService.createGameRoom(responseDto);
            log.info(responseDto.toString());
            return ResponseEntity.status(HttpStatus.OK).body(responseDto);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong room condition.");
        }


    }

    @GetMapping("/api/v1/room/{roomId}")
    public ResponseEntity<Object> findByRoomId(@PathVariable long roomId) {
        try {
            RoomResponseDto responseDto = roomService.findByRoomId(roomId);
            return ResponseEntity.ok(responseDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/api/v1/room/{roomId}")
    public ResponseEntity<Object> deleteById(@PathVariable long roomId) {
        try {
            roomService.deleteById(roomId);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }

    @GetMapping("/api/v1/room/id/{pinNumber}")
    public RoomResponseDto findByPinNumber(@PathVariable String pinNumber) {
        log.info(pinNumber);

        return roomService.findByPinNumber(pinNumber);
    }

    @MessageMapping("/enter/{roomId}")
    @SendTo("/sub/{roomId}")
    public ResponseEntity<Object> processClientEntrance(@DestinationVariable long roomId, @Payload SocketData data,
                                             @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

        long userId = data.getUserId();
        String nickname = data.getNickname();
        boolean isBot = data.isBot();
        String sessionId = headerAccessor.getSessionId();
        log.info(roomId + " 번 방에 user Id " + userId + " 인 유저가 입장 -> session ID: " + sessionId);
        try {
            roomService.processClientEntrance(roomId, userId, sessionId);
            gameService.addPlayer(roomId, userId, nickname, isBot);
            List<Player> playerList = gameService.getPlayerList(roomId);
            return ResponseEntity.status(HttpStatus.OK).body(SocketData.builder()
                    .type(TypeEnum.ENTER.name())
                    .userId(userId)
                    .nickname(nickname)
                    .isBot(isBot)
                    .numPlayer(playerList.size())
                    .playerList(playerList)
                    .build());
        } catch (IllegalStateException e) {
            log.error("Failed to add player to the room: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
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
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @MessageMapping("/update/{roomId}")
    @SendTo("/sub/{roomId}")
    public ResponseEntity<Object> update(@DestinationVariable long roomId, @Payload RoomRequestDto requestDto,
                                             @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {
        try {
            log.info(requestDto.toString());
            if (requestDto.getRoomName().length() > 0 && requestDto.getCapacity() > 1 && requestDto.getTimeLimit() > 0) {
                RoomResponseDto responseDto = roomService.update(requestDto, roomId);

                gameService.changeGameRoom(responseDto);
                log.info(responseDto.toString());
                return ResponseEntity.status(HttpStatus.OK).body(responseDto);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong room condition.");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @MessageMapping("/chat/{roomId}")
    public void chat(@DestinationVariable long roomId, @Payload MsgData data,
                                       @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) {
        try {
            MsgData response = MsgData.builder()
                    .type(data.getType())
                    .content(timeManager.getCurrentTime() + data.getSender() + ": " + data.getContent())
                    .build();
            roomService.sendMessageToRoom(roomId, ResponseEntity.status(HttpStatus.OK).body(response));
        } catch (NullPointerException e) {
            roomService.sendMessageToRoom(roomId, ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage()));
        }
    }

    @MessageMapping("/speech/{roomId}")
    public void speech(@DestinationVariable long roomId, @Payload MsgData data,
                       @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) {
        
    }
}
