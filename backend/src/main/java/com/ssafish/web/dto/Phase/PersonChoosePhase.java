package com.ssafish.web.dto.Phase;

import com.ssafish.web.dto.GameData;
import com.ssafish.web.dto.GameStatus;
import com.ssafish.web.dto.TypeEnum;
import org.springframework.messaging.handler.annotation.Payload;

import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class PersonChoosePhase extends Phase {

    public PersonChoosePhase(int roomId, int turnTimeLimit) {
        super(roomId, turnTimeLimit);
    }

    public GameStatus startTurnTimer(GameStatus gameStatus) {

        latch = new CountDownLatch(1);
        turnTimer = Executors.newSingleThreadScheduledExecutor();

        messagingTemplate.convertAndSend("/sub/" + roomId,
                GameData.builder()
                        .type(TypeEnum.SELECT_PLAYER_TURN.name())
                        .player(gameStatus.getCurrentPlayer().getUserId())
                        .build()
        );

        // 자동 처리 로직
        GameData gameData = GameData.builder()
                .type(TypeEnum.SELECT_PLAYER.name())
                .cardId(randomPlayerId(gameStatus)) // 손패에서 랜덤 카드 ID 선택
                .build();
        gameData.setResponser(randomPlayerId(gameStatus));


        if (gameStatus.getCurrentPlayer().isBot()) { // 현재 플레이어가 봇일 경우
            turnTimer.schedule(() -> endTurn(gameData, gameStatus), randomResponseTime(turnTimeLimit), TimeUnit.SECONDS);
        } else {                                     // 현재 플레이어가 봇이 아닐 경우
            turnTimer.schedule(() -> endTurn(gameData, gameStatus), turnTimeLimit, TimeUnit.SECONDS);
        }
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

    public void endTurn(GameData gameData, GameStatus gameStatus) {
        cancelTurnTimer();

        // 게임 내부 로직
        gameStatus.changeOpponentPlayer(gameData.getResponser());

        // subscriber 들에게 메시지 전달
        messagingTemplate.convertAndSend("/sub/" + roomId, gameData);


        latch.countDown();
    }

    public void handlePub(@Payload GameData gameData, GameStatus gameStatus) {
        // pub 처리
        if (TypeEnum.TEST_PLAYER.name().equals(gameData.getType())) {           // 질문 대상 떠보기
            messagingTemplate.convertAndSend("/sub/" + roomId, gameData);
        } else if (TypeEnum.SELECT_PLAYER.name().equals(gameData.getType())) {  // 질문 대상 지목하기
            this.endTurn(gameData, gameStatus);
        }
    }

    public Integer randomPlayerId(GameStatus gameStatus) {
        List<Integer> playerOrder = gameStatus.getPlayerOrder();
        return playerOrder.get((int) (Math.random() * playerOrder.size()));
    }

    public int randomResponseTime(int timeLimit) {
        return Math.max(3, (int) (Math.random() * timeLimit / 2));
    }
}

