package com.ssafish.domain;

import com.ssafish.web.dto.RoomRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id", unique = true, nullable = false)
    private Long roomId;

    @Column(name = "pin_number", unique = true, nullable = false)
    private String pinNumber;

    @Column(name = "room_name", unique = false, nullable = false)
    private String roomName;

    @Column(name = "user_id", unique = false, nullable = true)
    private Long userId;

    @Column(name = "deck_id", nullable = true)
    private Long deckId;

    @Column(name = "time_limit", nullable = false)
    private Long timeLimit;

    @Column(name = "capacity", nullable = false)
    private Long capacity;

    @Column(name = "game_type", nullable = false)
    private String gameType;

    @Builder
    public Room(Long roomId, String pinNumber, String roomName, Long userId, Long deckId, Long timeLimit, Long capacity, String gameType) {
        this.roomId = roomId;
        this.pinNumber = pinNumber;
        this.roomName = roomName;
        this.userId = userId;
        this.deckId = deckId;
        this.timeLimit = timeLimit;
        this.capacity = capacity;
        this.gameType = gameType;
    }

    public void update(RoomRequestDto requestDto) {
        this.roomName = requestDto.getRoomName();
        this.capacity = requestDto.getCapacity();
        this.timeLimit = requestDto.getTimeLimit();
        this.deckId = requestDto.getDeckId();
    }
}
