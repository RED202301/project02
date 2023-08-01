package com.ssafish.web.dto;

import com.ssafish.domain.Room;
import lombok.*;

@Getter
@AllArgsConstructor
@Builder(access = AccessLevel.PRIVATE)
public class RoomResponseDto {

    private Integer roomId;
    private String pinNumber;
    private String roomName;
    private Integer userId;
    private Integer deckId;
    private Integer timeLimit;
    private Integer capacity;
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
