package com.ssafish.web.dto;

import com.ssafish.domain.room.Room;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class RoomRequestDto {
    @Setter
    private String pinNumber;
    private String roomName;
    private Long userId;
    private Long deckId;
    private Long timeLimit;
    private Long capacity;
    private String gameType;

    @Builder
    public RoomRequestDto(String pinNumber, String roomName, Long userId, Long deckId, Long timeLimit, Long capacity, String gameType) {
        this.pinNumber = pinNumber;
        this.roomName = roomName;
        this.userId = userId;
        this.deckId = deckId;
        this.timeLimit = timeLimit;
        this.capacity = capacity;
        this.gameType = gameType;
    }

    public Room toEntity() {
        return Room.builder()
                .pinNumber(pinNumber)
                .roomName(roomName)
                .userId(userId)
                .deckId(deckId)
                .timeLimit(timeLimit)
                .capacity(capacity)
                .gameType(gameType)
                .build();
    }
}
