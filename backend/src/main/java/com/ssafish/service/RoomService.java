package com.ssafish.service;

import com.ssafish.common.util.WebSocketSubscriberManager;
import com.ssafish.domain.room.Room;
import com.ssafish.domain.room.RoomRepository;
import com.ssafish.web.dto.RoomRequestDto;
import com.ssafish.web.dto.RoomResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final WebSocketSubscriberManager subscriberManager;
    private final SimpMessageSendingOperations messagingTemplate;

    public void sendMessageToRoom(long roomId, ResponseEntity<?> response) {
        Map<Long, String> sessionIds = subscriberManager.getRoomById(roomId);
        if (sessionIds == null) {
            throw new NullPointerException(roomId + "번 방의 소켓 세션이 없습니다.");
        }
        messagingTemplate.convertAndSend("/sub/" + roomId, response);
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
        return RoomResponseDto.from(roomRepository.save(changeRoom));
    }

    @Transactional
    public RoomResponseDto update(RoomRequestDto requestDto, long roomId) {
        Room changeRoom = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found"));

        changeRoom.update(requestDto);

        return RoomResponseDto.from(changeRoom);
    }

    @Transactional
    public void deleteById(long roomId) {
        roomRepository.deleteById(roomId);
    }

    public RoomResponseDto findByPinNumber(String pinNumber) {
        return RoomResponseDto.from(roomRepository.findByPinNumber(pinNumber));
    }

    public RoomResponseDto findByRoomId(long roomId) {
        return RoomResponseDto.from(roomRepository.findByRoomId(roomId));
    }
}
