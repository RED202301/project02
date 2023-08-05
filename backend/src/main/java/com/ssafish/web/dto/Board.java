package com.ssafish.web.dto;

import com.ssafish.web.dto.Phase.Phase;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class Board {
    private GameStatus gameStatus;
    private Phase currentPhase;

    Board(GameStatus gameStatus) { // 게임 시작 시 게임판 세팅
        this.gameStatus = gameStatus;
    }

    public void gameStart() {
        // Card List 받아서 뿌려주기

        // User List 바탕으로 gameStatus init

        // phaseList 채우기

    }

    public void gameOver() {

    }

    public void play() {
        gameStart();

        while (!gameStatus.isGameOver()) {
            currentPhase = gameStatus.currentPhase;

            gameStatus = currentPhase.startTurnTimer(gameStatus);
        }

        gameOver();
    }

    public void handlePub(GameData gameData) {
        // pub 처리
        currentPhase.handlePub(gameData, gameStatus);
    }
}
