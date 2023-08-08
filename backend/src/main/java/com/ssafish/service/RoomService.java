package com.ssafish.service;

import com.ssafish.common.util.WebSocketSubscriberManager;
import com.ssafish.domain.Room;
import com.ssafish.domain.RoomRepository;
import com.ssafish.web.dto.RoomRequestDto;
import com.ssafish.web.dto.RoomResponseDto;
import com.ssafish.web.dto.SocketData;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final WebSocketSubscriberManager subscriberManager;
    private final SimpMessageSendingOperations messagingTemplate;

    public void sendMessageToRoom(Long roomId, String message) {
        Map<Long, String> sessionIds = subscriberManager.getRoomById(roomId);
        if (sessionIds == null) {
            System.out.println("TT");
            return;
        }
        messagingTemplate.convertAndSend("/sub/" + roomId, new SocketData(77L, message, true));
    }

    public void processClientEntrance(Long roomId, Long userId, String sessionId) {
        subscriberManager.addSubscriber(roomId, userId, sessionId);
    }

    @Transactional
    public RoomResponseDto create(RoomRequestDto requestDto) {
        return RoomResponseDto.from(roomRepository.save(requestDto.toEntity()));
    }

    @Transactional
    public RoomResponseDto change(RoomRequestDto requestDto, long roomId) {
        Room changeRoom = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found"));

        // 값 업데이트
        changeRoom.setRoomName(requestDto.getRoomName());
        changeRoom.setCapacity(requestDto.getCapacity());
        changeRoom.setTimeLimit(requestDto.getTimeLimit());
        changeRoom.setDeckId(requestDto.getDeckId());

        // 변경된 엔티티를 RoomResponseDto로 변환하여 반환 // 두번인지 확인
        return RoomResponseDto.from(changeRoom);
    }

    public RoomResponseDto findByPinNumber(String pinNumber) {
        return RoomResponseDto.from(roomRepository.findByPinNumber(pinNumber));
    }

    public RoomResponseDto findByRoomId(long roomId) {
        return RoomResponseDto.from(roomRepository.findByRoomId(roomId));
    }
}
