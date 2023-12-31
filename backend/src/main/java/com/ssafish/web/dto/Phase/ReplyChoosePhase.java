package com.ssafish.web.dto.Phase;

import com.ssafish.service.RoomService;
import com.ssafish.web.dto.GameData;
import com.ssafish.web.dto.GameStatus;
import com.ssafish.web.dto.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Slf4j
@RequiredArgsConstructor
@Component
public class ReplyChoosePhase extends Phase implements ChoosePhase {

    protected final RoomService roomService;

    @Override
    public void startTurnTimer(GameStatus gameStatus, ScheduledExecutorService turnTimer, CountDownLatch latch) {
        awaitSecond(1L);
        log.info(gameStatus.getRoomId() + "번 방 - ReplyChoosePhase 시작");

        // 턴 시작을 알림
        roomService.sendMessageToRoom(gameStatus.getRoomId(),
                ResponseEntity.ok(GameData.builder()
                              .type(MessageType.REPLY_TURN.name())
                              .player(gameStatus.getOpponentPlayer().getUserId())
                              .cardId(gameStatus.getCardOpen())
                              .build())
        );

        // 자동 처리 로직
        GameData gameData = GameData.builder()
                .type(MessageType.REPLY.name())
                .requester(gameStatus.getCurrentPlayer().getUserId())
                .responser(gameStatus.getOpponentPlayer().getUserId())
                .cardId(gameStatus.getCardOpen())
                .isGoFish(this.isGoFish(gameStatus))
                .build();


        if (gameStatus.getCurrentPlayer().isBot()) { // 현재 플레이어가 봇일 경우
            turnTimer.schedule(() -> endTurn(gameData, gameStatus, turnTimer, latch), randomResponseTime(gameStatus.getTurnTimeLimit()), TimeUnit.SECONDS);
        } else {                                     // 현재 플레이어가 봇이 아닐 경우
            turnTimer.schedule(() -> endTurn(gameData, gameStatus, turnTimer, latch), gameStatus.getTurnTimeLimit(), TimeUnit.SECONDS);
        }

        try {
            latch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public void cancelTurnTimer(ScheduledExecutorService turnTimer) {
        if (turnTimer != null && !turnTimer.isShutdown()) {
            turnTimer.shutdownNow();
        }
    }

    @Override
    public void endTurn(GameData gameData, GameStatus gameStatus, ScheduledExecutorService turnTimer, CountDownLatch latch) {
        int delaySecond = 0;

        cancelTurnTimer(turnTimer);

        ScheduledExecutorService turnTimer2 = Executors.newSingleThreadScheduledExecutor();

        // 게임 내부 로직

        List<Long> handCurrent = gameStatus.getCurrentPlayer().getCardsOnHand();
        List<Long> handOpponent = gameStatus.getOpponentPlayer().getCardsOnHand();
        List<Long> enrollCurrent = gameStatus.getCurrentPlayer().getCardsEnrolled();
        List<Long> middleDeck = gameStatus.getMiddleDeck();

        roomService.sendMessageToRoom(gameStatus.getRoomId(), ResponseEntity.ok(gameData));

        int currentPlayerIdx = gameStatus.getCurrentPlayerIdx();
        long currentUserId = gameStatus.getPlayerList().get(currentPlayerIdx).getUserId();
        long opponentUserId = gameStatus.getOpponentPlayer().getUserId();

        if (gameData.isGoFish()) {
        // isGoFish = true면 짝인 카드가 없다
            if (!middleDeck.isEmpty()) {
            // 중앙 덱에 카드가 있으면 카드 드로우
                Long cardDraw = middleDeck.remove(middleDeck.size() - 1);

                turnTimer2.schedule(() -> sendAutoDraw(gameStatus, currentUserId, cardDraw), 2 * ++delaySecond, TimeUnit.SECONDS);
                // 카드가 requester 손패로 이동
                if (!handCurrent.contains(cardDraw)) {
                    handCurrent.add(cardDraw);
                } else {
                // 짝이 있다면 등록패로 이동
                    handCurrent.remove(cardDraw);
                    enrollCurrent.add(cardDraw);
                    gameStatus.getCheatSheet().remove(cardDraw);
                    gameStatus.getCurrentPlayer().addScore(gameStatus.getPointMap().get(cardDraw));

                    turnTimer2.schedule(() -> sendEnroll(gameStatus, currentUserId, cardDraw), 2 * ++delaySecond, TimeUnit.SECONDS);

                    log.info(gameStatus.getRoomId() + "번 방 - 한 유저의 손패 수: " + handCurrent.size());
                    if (handCurrent.isEmpty()) {
                        gameStatus.setGameOver(true);
                    }
                }
            }
            // 지목 대상 선택 페이즈 + 다음 사람 턴
            gameStatus.changeCurrentPhase();
            gameStatus.changeCurrentPlayer();
        } else {
        // isGoFish = false면 짝인 카드가 있다
            // 카드를 상대 플레이어에게서 삭제, 현재 플레이어에게서도 삭제
            long cardOpen = gameStatus.getCardOpen();
            handOpponent.remove(cardOpen);
            handCurrent.remove(cardOpen);

            turnTimer2.schedule(() -> sendCardMove(gameStatus, opponentUserId, currentUserId, cardOpen), 2 * ++delaySecond, TimeUnit.SECONDS);

            // 짝 맞춰 플레이어의 등록패로 이동
            enrollCurrent.add(cardOpen);
            gameStatus.getCheatSheet().remove(cardOpen);
            gameStatus.getCurrentPlayer().addScore(gameStatus.getPointMap().get(cardOpen));


            turnTimer2.schedule(() -> sendEnroll(gameStatus, currentUserId, cardOpen), 2 * ++delaySecond, TimeUnit.SECONDS);

            log.info(gameStatus.getRoomId() + "번 방 - 한 유저의 손패 수: " + handCurrent.size() + " - 다른 유저의 손패 수: " + handOpponent.size());
            if (handCurrent.isEmpty() || handOpponent.isEmpty()) {
                gameStatus.setGameOver(true);
            }

            // 지목 대상 선택 페이즈 + 같은 사람턴
            gameStatus.changeCurrentPhase();
        }

        turnTimer2.schedule(latch::countDown, 2 * delaySecond + 1, TimeUnit.SECONDS);
    }

    @Override
    public void handlePub(GameData gameData, GameStatus gameStatus, ScheduledExecutorService turnTimer, CountDownLatch latch) {
        // pub 처리
        this.endTurn(gameData, gameStatus, turnTimer, latch);
    }

    public boolean isGoFish(GameStatus gameStatus) {
        List<Long> cardsOnHand = gameStatus.getOpponentPlayer().getCardsOnHand();
        return !cardsOnHand.contains(gameStatus.getCardOpen());
    }

    public long randomResponseTime(long timeLimit) {
        return Math.max(3, (int) (Math.random() * timeLimit / 2));
    }

    public void sendAutoDraw(GameStatus gameStatus, long currentUserId, long cardDraw) {
        roomService.sendMessageToRoom(gameStatus.getRoomId(),
                ResponseEntity.ok(GameData.builder()
                                          .type(MessageType.AUTO_DRAW.name())
                                          .player(currentUserId)
                                          .cardId(cardDraw)
                                          .build())
        );
    }

    public void sendEnroll(GameStatus gameStatus, long userId, long cardId) {
        roomService.sendMessageToRoom(gameStatus.getRoomId(),
                ResponseEntity.ok(GameData.builder()
                                          .type(MessageType.ENROLL.name())
                                          .player(userId)
                                          .cardId(cardId)
                                          .build())
        );
    }

    public void sendCardMove(GameStatus gameStatus, long opponentUserId, long currentUserId, long cardOpen) {
        roomService.sendMessageToRoom(gameStatus.getRoomId(),
                ResponseEntity.ok(GameData.builder()
                                          .type(MessageType.CARD_MOVE.name())
                                          .from(opponentUserId)
                                          .to(currentUserId)
                                          .cardId(cardOpen)
                                          .build())
        );
    }
}