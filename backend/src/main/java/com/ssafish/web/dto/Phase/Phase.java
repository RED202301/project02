package com.ssafish.web.dto.Phase;

import com.ssafish.web.dto.GameData;
import com.ssafish.web.dto.GameStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public abstract class Phase {

    protected SimpMessageSendingOperations messagingTemplate;
    protected ScheduledExecutorService turnTimer;
    protected CountDownLatch latch;
    protected int roomId;
    protected int turnTimeLimit; // Phase 생성 시 파라미터로 받아야 함

    public Phase(int roomId, int turnTimeLimit) {
        this.roomId = roomId;
        this.turnTimeLimit = turnTimeLimit;
    }


    public abstract GameStatus startTurnTimer(GameStatus gameStatus);

    public abstract void cancelTurnTimer();

    public abstract void endTurn(GameData gameData, GameStatus gameStatus);

    public abstract void handlePub(GameData gameData, GameStatus gameStatus);
}
