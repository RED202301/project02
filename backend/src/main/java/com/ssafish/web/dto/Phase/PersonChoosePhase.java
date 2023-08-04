package com.ssafish.web.dto.Phase;

import com.ssafish.web.dto.GameData;
import com.ssafish.web.dto.GameStatus;
import org.springframework.messaging.handler.annotation.Payload;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class PersonChoosePhase extends Phase {

    /*
    *
    *
    protected SimpMessageSendingOperations messagingTemplate;
    protected ScheduledExecutorService turnTimer;
    protected CountDownLatch latch;
    protected long turnTimeLimit; // Phase 생성 시 파라미터로 받아야 함
    protected GameStatus gameStatus;
    *
    * */

    public GameStatus startTurnTimer(GameStatus gameStatus) {
        this.gameStatus = gameStatus;

        latch = new CountDownLatch(1);
        turnTimer = Executors.newSingleThreadScheduledExecutor();
        turnTimer.schedule(this::endTurn, turnTimeLimit, TimeUnit.SECONDS);

        try {
            latch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return gameStatus;
    }

    public void cancelTurnTimer() {
        if (turnTimer != null && !turnTimer.isShutdown()) {
            turnTimer.shutdownNow();
        }
    }

    public void endTurn() {
        cancelTurnTimer();

        // 게임 내부 로직

        // subscriber 들에게 메시지 전달


        latch.countDown();
    }

    public void handlePub(@Payload GameData gameData) {
        // pub 처리

        this.endTurn();
    }
}
