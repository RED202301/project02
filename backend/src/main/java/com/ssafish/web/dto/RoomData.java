package com.ssafish.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

@Getter
@NoArgsConstructor
public class RoomData {

    private String roomTitle;
    private int deckId;
    private int timeLimit;
    private int capacity;
    private String gameType;
    private List<Player> playerList;

    @Builder
    public RoomData(String roomTitle, int deckId, int timeLimit, int capacity, String gameType, List<Player> playerList) {
        this.roomTitle = roomTitle;
        this.deckId = deckId;
        this.timeLimit = timeLimit;
        this.capacity = capacity;
        this.gameType = gameType;
        this.playerList = playerList;
    }
}
