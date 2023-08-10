package com.ssafish.web.dto.Phase;

import com.ssafish.web.dto.GameData;
import com.ssafish.web.dto.GameStatus;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ScheduledExecutorService;

public interface ChoosePhase {

    void startTurnTimer(GameStatus gameStatus, ScheduledExecutorService turnTimer, CountDownLatch latch);

    void cancelTurnTimer(ScheduledExecutorService turnTimer);

    void endTurn(GameData gameData, GameStatus gameStatus, ScheduledExecutorService turnTimer, CountDownLatch latch);

    void handlePub(GameData gameData, GameStatus gameStatus, ScheduledExecutorService turnTimer, CountDownLatch latch);
}
