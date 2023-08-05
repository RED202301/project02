package com.ssafish.web.dto.Phase;

import com.ssafish.web.dto.GameData;
import com.ssafish.web.dto.GameStatus;
import com.ssafish.web.dto.TypeEnum;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@Component
public class CardChoosePhase extends Phase implements ChoosePhase {
    protected final SimpMessageSendingOperations messagingTemplate;

    public GameStatus startTurnTimer(GameStatus gameStatus) {

        latch = new CountDownLatch(1);
        turnTimer = Executors.newSingleThreadScheduledExecutor();

        // 턴 시작을 알림
        messagingTemplate.convertAndSend("/sub/" + gameStatus.getRoomId(),
                GameData.builder()
                        .type(TypeEnum.SELECT_CARD_TURN.name())
                        .player(gameStatus.getCurrentPlayer().getUserId())
                        .build()
        );


        // 자동 처리 로직
        GameData gameData = GameData.builder()
                                    .type(TypeEnum.SELECT_CARD.name())
                                    .cardId(randomCardId((gameStatus))) // 손패에서 랜덤 카드 ID 선택
                                    .build();


        if (gameStatus.getCurrentPlayer().isBot()) { // 현재 플레이어가 봇일 경우
            turnTimer.schedule(() -> endTurn(gameData, gameStatus), randomResponseTime(gameStatus.getTurnTimeLimit()), TimeUnit.SECONDS);
        } else {                                     // 현재 플레이어가 봇이 아닐 경우
            turnTimer.schedule(() -> endTurn(gameData, gameStatus), gameStatus.getTurnTimeLimit(), TimeUnit.SECONDS);
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
        gameStatus.setCardOpen(gameData.getCardId()); // 공개 카드 반영

        // subscriber 들에게 메시지 전달
        messagingTemplate.convertAndSend("/sub/" + gameStatus.getRoomId(), gameData);

        // 다음 턴으로 진행
        gameStatus.changeCurrentPhase();

        latch.countDown();
    }

    public void handlePub(GameData gameData, GameStatus gameStatus) {
        // pub 처리

        this.endTurn(gameData, gameStatus);
    }

    public long randomCardId(GameStatus gameStatus) {
        List<Long> cardsOnHand = gameStatus.getCurrentPlayer().getCardsOnHand();
        return cardsOnHand.get((int) (Math.random() * cardsOnHand.size()));
    }

    public long randomResponseTime(long timeLimit) {
        return Math.max(3, (int) (Math.random() * timeLimit / 2));
    }
}