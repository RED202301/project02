package com.ssafish.web.dto.Phase;

import com.ssafish.web.dto.GameData;
import com.ssafish.web.dto.GameStatus;
import com.ssafish.web.dto.TypeEnum;
import org.springframework.messaging.handler.annotation.Payload;

import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class ReplyChoosePhase extends Phase {

    public ReplyChoosePhase(int roomId, int turnTimeLimit) {
        super(roomId, turnTimeLimit);
    }

    @Override
    public GameStatus startTurnTimer(GameStatus gameStatus) {

        latch = new CountDownLatch(1);
        turnTimer = Executors.newSingleThreadScheduledExecutor();

        // 턴 시작을 알림
        messagingTemplate.convertAndSend("/sub/" + roomId,
                GameData.builder()
                        .type(TypeEnum.REPLY_TURN.name())
                        .player(gameStatus.getOpponentPlayer().getUserId())
                        .cardId(gameStatus.getCardOpen())
                        .build()
        );

        // 자동 처리 로직
        GameData gameData = GameData.builder()
                .type(TypeEnum.REPLY.name())
                .requester(gameStatus.getCurrentPlayer().getUserId())
                .responser(gameStatus.getOpponentPlayer().getUserId())
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

    @Override
    public void endTurn(GameData gameData, GameStatus gameStatus) {
        int delaySecond = 0;

        cancelTurnTimer();

        ScheduledExecutorService turnTimer2 = Executors.newSingleThreadScheduledExecutor();

        // 게임 내부 로직

        List<Integer> handCurrent = gameStatus.getCurrentPlayer().getCardsOnHand();
        List<Integer> handOpponent = gameStatus.getOpponentPlayer().getCardsOnHand();
        List<Integer> enrollCurrent = gameStatus.getCurrentPlayer().getCardsEnrolled();
        List<Integer> middleDeck = gameStatus.getMiddleDeck();

        messagingTemplate.convertAndSend("/sub/" + roomId, gameData);

        if (gameData.isGoFish()) {
        // isGoFish = true면 짝인 카드가 없다
            if (!middleDeck.isEmpty()) {
            // 중앙 덱에 카드가 있으면 카드 드로우
                Integer cardDraw = middleDeck.remove(middleDeck.size() - 1);

                turnTimer2.schedule(() -> sendAutoDraw(gameStatus, cardDraw), 2 * ++delaySecond, TimeUnit.SECONDS);
                // 카드가 requester 손패로 이동
                if (!handCurrent.contains(cardDraw)) {
                    handCurrent.add(cardDraw);
                } else {
                // 짝이 있다면 등록패로 이동
                    handCurrent.remove(cardDraw);
                    enrollCurrent.add(cardDraw);

                    turnTimer2.schedule(() -> sendEnroll(gameStatus.getCurrentPlayer().getUserId(), cardDraw), 2 * ++delaySecond, TimeUnit.SECONDS);

                    if (handCurrent.isEmpty()) {
                        gameStatus.setGameOver(true);
                    }
                }
            } else {
            // 없으면 지목 대상 선택 페이즈 + 다음 사람턴
                //
                gameStatus.changeCurrentPhase();
                gameStatus.changeCurrentPlayer();
            }
        } else {
        // isGoFish = false면 짝인 카드가 있다
            // 카드를 상대 플레이어에게서 삭제, 현재 플레이어에게서도 삭제
            Integer cardOpen = gameStatus.getCardOpen();
            handOpponent.remove(cardOpen);
            handCurrent.remove(cardOpen);

            turnTimer2.schedule(() -> sendCardMove(gameStatus), 2 * ++delaySecond, TimeUnit.SECONDS);

            // 짝 맞춰 플레이어의 등록패로 이동
            enrollCurrent.add(cardOpen);

            turnTimer2.schedule(() -> sendEnroll(gameStatus.getCurrentPlayer().getUserId(), cardOpen), 2 * ++delaySecond, TimeUnit.SECONDS);

            if (handCurrent.isEmpty() || handOpponent.isEmpty()) {
                gameStatus.setGameOver(true);
            }

            // 지목 대상 선택 페이즈 + 같은 사람턴
            gameStatus.changeCurrentPhase();
        }

        turnTimer2.schedule(latch::countDown, 2 * delaySecond + 1, TimeUnit.SECONDS);
    }

    @Override
    public void handlePub(GameData gameData, GameStatus gameStatus) {
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

    public void sendAutoDraw(GameStatus gameStatus, int cardDraw) {
        messagingTemplate.convertAndSend("/sub/" + gameStatus.getRoomId(),
                GameData.builder()
                        .type(TypeEnum.AUTO_DRAW.name())
                        .player(gameStatus.getCurrentPlayer().getUserId())
                        .cardId(cardDraw)
                        .build()
        );
    }

    public void sendEnroll(int userId, int cardId) {
        messagingTemplate.convertAndSend("/sub/" + roomId,
                GameData.builder()
                        .type(TypeEnum.ENROLL.name())
                        .player(userId)
                        .cardId(cardId)
                        .build()
        );
    }

    public void sendCardMove(GameStatus gameStatus) {
        messagingTemplate.convertAndSend("/sub/" + roomId,
                GameData.builder()
                        .type(TypeEnum.CARD_MOVE.name())
                        .from(gameStatus.getOpponentPlayer().getUserId())
                        .to(gameStatus.getCurrentPlayer().getUserId())
                        .build()
        );
    }
}