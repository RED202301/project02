package com.ssafish.web.dto.Phase;

import com.ssafish.web.dto.GameData;
import com.ssafish.web.dto.GameStatus;

import java.util.concurrent.ScheduledExecutorService;

public interface ChoosePhase {

    void startTurnTimer(GameStatus gameStatus, ScheduledExecutorService turnTimer);

    void cancelTurnTimer(ScheduledExecutorService turnTimer);

    void endTurn(GameData gameData, GameStatus gameStatus, ScheduledExecutorService turnTimer);

    void handlePub(GameData gameData, GameStatus gameStatus, ScheduledExecutorService turnTimer);
}
