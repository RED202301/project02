package com.ssafish.web.dto;

import com.ssafish.web.dto.Phase.Phase;
import com.ssafish.web.dto.Phase.PhaseEnum;
import org.springframework.context.event.EventListener;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class Board {
    List<Phase> phases;
    List<Player> players;
    List<Long> middleDeck;

    int currentPhaseIdx;
    int currentPlayerIdx;
    int opponentPlayerIdx;
    Long cardOpen;

    private long turnTimeLimit; // Board 생성 시 파라미터로 받아야 함

    Board(long timeLimit, List<Long> cardIdList) { // 게임 시작 시 게임판 세팅
        this.turnTimeLimit = timeLimit;
        middleDeck = cardIdList;
        phases = new ArrayList<>();
    }

    private void changeCurrentPhase() {
        currentPhaseIdx = (currentPhaseIdx + 1) % phases.size();
    }

    private void changeCurrentPlayer() {
        currentPlayerIdx = (currentPlayerIdx + 1) % players.size();
    }
}
