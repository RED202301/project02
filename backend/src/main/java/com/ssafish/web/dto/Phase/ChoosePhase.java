package com.ssafish.web.dto.Phase;

import com.ssafish.web.dto.GameData;
import com.ssafish.web.dto.GameStatus;

public interface ChoosePhase {

    GameStatus startTurnTimer(GameStatus gameStatus);

    void cancelTurnTimer();

    void endTurn(GameData gameData, GameStatus gameStatus);

    void handlePub(GameData gameData, GameStatus gameStatus);
}
