package com.ssafish.web;

import com.ssafish.service.GameRoomService;
import com.ssafish.web.dto.MsgRequest;
import com.ssafish.web.dto.RoomRequest;
import com.ssafish.web.dto.RoomResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;


@Slf4j
@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
public class TestRoomController {

    private final GameRoomService gameRoomService;

    static Map<String, Integer> rooms = new HashMap<>();


    @PostMapping("/api/v1/room")
    public RoomResponse createRoom(@RequestBody RoomRequest roomRequest) {
        log.debug(roomRequest.toString());

        RoomResponse res = new RoomResponse();
        String uuid = UUID.randomUUID().toString();
        rooms.put(uuid, rooms.size() + 1);
        res.setRoomId(rooms.size());
        res.setPinNumber(uuid);
        return res;
    }

    @GetMapping("/api/v1/room/id/{pinNumber}")
    public RoomResponse roomIdByPinNumber(@PathVariable String pinNumber) {
        log.debug(pinNumber);

        RoomResponse res = new RoomResponse();

        res.setRoomId(rooms.get(pinNumber));
        res.setPinNumber(pinNumber);
        return res;
    }

    @PostMapping("/api/v1/room/msg")
    public void msgToRoom(@RequestBody MsgRequest msgRequest) throws IOException {
        log.debug(msgRequest.toString());

        Integer roomId = msgRequest.getRoomId();
        String content = msgRequest.getContent();
        gameRoomService.sendMessageToRoom(roomId, content);
    }
}
