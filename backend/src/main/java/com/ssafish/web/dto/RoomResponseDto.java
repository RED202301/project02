package com.ssafish.web.dto;

import com.ssafish.domain.room.Room;
import lombok.*;

@ToString
@Getter
@AllArgsConstructor
@Builder(access = AccessLevel.PRIVATE)
public class RoomResponseDto {

    private Long roomId;
    private String pinNumber;
    private String roomName;
    private Long userId;
    private Long deckId;
    private Long timeLimit;
    private Long capacity;
    private String gameType;


    public static RoomResponseDto from(Room room) {
        return RoomResponseDto.builder()
                .roomId(room.getRoomId())
                .pinNumber(room.getPinNumber())
                .roomName(room.getRoomName())
                .userId(room.getUserId())
                .deckId(room.getDeckId())
                .timeLimit(room.getTimeLimit())
                .capacity(room.getCapacity())
                .gameType(room.getGameType())
                .build();
    }
}
