package com.ssafish.web.dto;

import com.ssafish.web.dto.Phase.Phase;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
public class GameStatus {
    private int roomId;

    List<Phase> phases;
    List<Player> players;
    List<Long> middleDeck;

    Phase currentPhase;
    private boolean isGameOver;
    private int currentPhaseIdx;
    private int currentPlayerIdx;
    private int opponentPlayerIdx;
    private Long cardOpen;
}
