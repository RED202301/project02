package com.ssafish.web.dto;

import com.ssafish.web.dto.Phase.ChoosePhase;
import com.ssafish.web.dto.Phase.GameOverPhase;
import com.ssafish.web.dto.Phase.GameStartPhase;
import com.ssafish.web.dto.Phase.Phase;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Scope;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

@Slf4j
@Data
@Component
@Scope("prototype")
public class Board {
    private final GameStartPhase gameStartPhase;
    private final GameOverPhase gameOverPhase;
    private long userId;
    private long deckId;
    private long timeLimit;
    private long capacity;
    private boolean isStarted = false;
    private GameStatus gameStatus;
    private ChoosePhase currentPhase;
    private ScheduledExecutorService turnTimer;
    private CountDownLatch latch;

    @Async("gameTaskExecutor")
    public void play(GameData gameData) {
        gameStatus.init();
        isStarted = true;
        gameStartPhase.run(gameData, gameStatus);
        log.info("Scheduled task invoked by thread: {}", Thread.currentThread().getName());
        while (!gameStatus.isGameOver()) {
            currentPhase = gameStatus.getCurrentPhase();

            turnTimer = Executors.newSingleThreadScheduledExecutor();
            latch = new CountDownLatch(1);

            currentPhase.startTurnTimer(gameStatus, turnTimer, latch);
        }

        gameOverPhase.run(gameStatus);
        isStarted = false;
    }

    public void handlePub(GameData gameData) {
        // pub 처리
        currentPhase.handlePub(gameData, gameStatus, turnTimer, latch);
    }

    public void addPlayer(long userId, String nickname, boolean isBot) {
        gameStatus.addPlayer(userId, nickname, isBot);
    }

    public void removePlayer(long userId) {
        gameStatus.removePlayer(userId);
    }
}
