package com.ssafish.web.dto;

import com.ssafish.web.dto.Phase.Phase;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class Board {
    List<Phase> methods;
    List<Player> players;
    List<Long> middleDeck;

    int currentMethodIdx;
    int currentPlayerIdx;
    int opponentPlayerIdx;
    Long cardOpen;

    private ScheduledExecutorService turnTimer;
    private long turnTimeLimit; // Board 생성 시 파라미터로 받아야 함

    Board(long timeLimit, List<Long> cardIdList) { // 게임 시작 시 게임판 세팅
        this.turnTimeLimit = timeLimit;
        middleDeck = cardIdList;
        methods = new ArrayList<>();

    }

    public void startTurnTimer() {
        turnTimer = Executors.newSingleThreadScheduledExecutor();
        turnTimer.schedule(this::endTurn, turnTimeLimit, TimeUnit.SECONDS);

        // 시작 턴 안내해야 할 경우 subscriber 들에게 메시지 전달
    }

    public void cancelTurnTimer() {
        if (turnTimer != null && !turnTimer.isShutdown()) {
            turnTimer.shutdownNow();
        }
    }

    public void endTurn() {
        cancelTurnTimer();

        // 게임 내부 로직

        // pub 내용을 subscriber 들에게 전달

        // 게임 종료 조건 분기해야 함

        if (true) { // 현재 종료되는 턴이 '상대가 대답하는 턴'일 때
            changeCurrentPlayer();
        }

        changeCurrentMethod(); // 현재 메소드 변경
                               // 상대 지목 -> 카드 선택 -> 상대 대답 -> 상대 지목

        startTurnTimer();
    }

    private void changeCurrentMethod() {
        currentMethodIdx = (currentMethodIdx + 1) % methods.size();
    }

    private void changeCurrentPlayer() {
        currentPlayerIdx = (currentPlayerIdx + 1) % players.size();
    }
}
