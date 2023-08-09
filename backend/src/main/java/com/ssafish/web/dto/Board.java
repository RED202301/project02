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

    @Async("gameTaskExecutor")
    public void play(GameData gameData) {
        gameStatus.init();
        isStarted = true;
        gameStartPhase.run(gameData, gameStatus);

        while (!gameStatus.isGameOver()) {
            currentPhase = gameStatus.getCurrentPhase();

            turnTimer = Executors.newSingleThreadScheduledExecutor();
            log.info("Board hashCode: " + this.hashCode());
            currentPhase.startTurnTimer(gameStatus, turnTimer);
        }

        gameOverPhase.run(gameStatus);
        isStarted = false;
    }

    public void handlePub(GameData gameData) {
        // pub 처리
        currentPhase.handlePub(gameData, gameStatus, turnTimer);
    }

    public void addPlayer(long userId, String nickname, boolean isBot) {
        gameStatus.addPlayer(userId, nickname, isBot);
    }

    public void removePlayer(long userId) {
        gameStatus.removePlayer(userId);
    }
}
