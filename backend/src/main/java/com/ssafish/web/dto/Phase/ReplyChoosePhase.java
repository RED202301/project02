package com.ssafish.web.dto.Phase;

import com.ssafish.web.dto.GameData;
import com.ssafish.web.dto.GameStatus;
import com.ssafish.web.dto.TypeEnum;
import org.springframework.messaging.handler.annotation.Payload;

import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class ReplyChoosePhase extends Phase {

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

        // 턴 시작을 알림
        messagingTemplate.convertAndSend("/sub/" + gameStatus.getRoomId(),
                GameData.builder()
                        .type(TypeEnum.REPLY_TURN.name())
                        .player(gameStatus.getOpponentPlayer().getUserId())
                        .build()
        );

        // 자동 처리 로직
        GameData gameData = GameData.builder()
                                    .type(TypeEnum.REPLY.name())
                                    .isGoFish(this.isGoFish(gameStatus))
                                    .build();


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

    public void endTurn(@Payload GameData gameData, GameStatus gameStatus) {
        cancelTurnTimer();

        // 게임 내부 로직

        // subscriber 들에게 메시지 전달
        messagingTemplate.convertAndSend("/sub/" + gameStatus.getRoomId(), gameData);

        // 다음 턴으로 진행


        latch.countDown();
    }

    public void handlePub(@Payload GameData gameData, GameStatus gameStatus) {
        // pub 처리

        this.endTurn(gameData, gameStatus);
    }

    public boolean isGoFish(GameStatus gameStatus) {
        List<Integer> cardsOnHand = gameStatus.getOpponentPlayer().getCardsOnHand();
        return !cardsOnHand.contains(gameStatus.getCardOpen());
    }

    public int randomResponseTime(int timeLimit) {
        return Math.max(3, (int) (Math.random() * timeLimit / 2));
    }
}
