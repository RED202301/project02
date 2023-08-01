package com.ssafish.service;

import com.ssafish.common.util.WebSocketSubscriberManager;
import com.ssafish.domain.RoomRepository;
import com.ssafish.web.dto.RoomRequestDto;
import com.ssafish.web.dto.RoomResponseDto;
import com.ssafish.web.dto.SocketData;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final WebSocketSubscriberManager subscriberManager;
    private final SimpMessageSendingOperations messagingTemplate;

    public void sendMessageToRoom(Integer roomId, String message) throws IOException {
        Map<Integer, String> sessionIds = subscriberManager.getRoomById(roomId);
        if (sessionIds == null) {
            System.out.println("TT");
            return;
        }
        messagingTemplate.convertAndSend("/sub/" + roomId, new SocketData(77, message));
    }

    public void processClientEntrance(Integer roomId, Integer userId, String sessionId) {
        subscriberManager.addSubscriber(roomId, userId, sessionId);
    }

    @Transactional
    public RoomResponseDto create(RoomRequestDto requestDto) {
        return RoomResponseDto.from(roomRepository.save(requestDto.toEntity()));
    }

    public RoomResponseDto findByPinNumber(String pinNumber) {
        return RoomResponseDto.from(roomRepository.findByPinNumber(pinNumber));
    }
}
