package com.ssafish.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id", unique = true, nullable = false)
    private Integer roomId;

    @Column(name = "pin_number", unique = true, nullable = false)
    private String pinNumber;

    @Column(name = "room_name", unique = true, nullable = false)
    private String roomName;

    @Column(name = "user_id", unique = true, nullable = true)
    private Integer userId;

    @Column(name = "deck_id", nullable = true)
    private Integer deckId;

    @Column(name = "time_limit", nullable = false)
    private Integer timeLimit;

    @Column(name = "capacity", nullable = false)
    private Integer capacity;

    @Column(name = "game_type", nullable = false)
    private String gameType;

    @Builder
    public Room(Integer roomId, String pinNumber, String roomName, Integer userId, Integer deckId, Integer timeLimit, Integer capacity, String gameType) {
        this.roomId = roomId;
        this.pinNumber = pinNumber;
        this.roomName = roomName;
        this.userId = userId;
        this.deckId = deckId;
        this.timeLimit = timeLimit;
        this.capacity = capacity;
        this.gameType = gameType;
    }
}
