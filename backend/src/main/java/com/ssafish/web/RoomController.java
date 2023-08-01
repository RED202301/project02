package com.ssafish.web;

import com.ssafish.service.RoomService;
import com.ssafish.web.dto.MsgRequest;
import com.ssafish.web.dto.RoomRequestDto;
import com.ssafish.web.dto.RoomResponseDto;
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
public class RoomController {

    private final RoomService roomService;

    static Map<String, Integer> rooms = new HashMap<>();


    @PostMapping("/api/v1/room")
    public RoomResponseDto create(@RequestBody RoomRequestDto requestDto) {

        String uuid = UUID.randomUUID().toString();
        requestDto.setPinNumber(uuid);

        log.info(requestDto.toString());
        RoomResponseDto responseDto = roomService.create(requestDto);

        rooms.put(uuid, responseDto.getRoomId());

        return responseDto;
    }

    @GetMapping("/api/v1/room/id/{pinNumber}")
    public RoomResponseDto findByPinNumber(@PathVariable String pinNumber) {
        log.debug(pinNumber);

        return roomService.findByPinNumber(pinNumber);
    }

    @PostMapping("/api/v1/room/msg")
    public void msgToRoom(@RequestBody MsgRequest msgRequest) throws IOException {
        log.debug(msgRequest.toString());

        Integer roomId = msgRequest.getRoomId();
        String content = msgRequest.getContent();
        roomService.sendMessageToRoom(roomId, content);
    }
}
