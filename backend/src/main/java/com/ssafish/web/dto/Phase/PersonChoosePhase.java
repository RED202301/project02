package com.ssafish.web.dto.Phase;

import com.ssafish.web.dto.GameData;
import com.ssafish.web.dto.GameStatus;
import com.ssafish.web.dto.Player;
import com.ssafish.web.dto.TypeEnum;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Slf4j
@RequiredArgsConstructor
@Component
public class PersonChoosePhase extends Phase implements ChoosePhase {

    protected final SimpMessageSendingOperations messagingTemplate;

    public void startTurnTimer(GameStatus gameStatus, ScheduledExecutorService turnTimer) {
        awaitSecond(1L);
        log.info(gameStatus.getRoomId() + "번 방 - PersonChoosePhase 시작");

        latch = new CountDownLatch(1);

        messagingTemplate.convertAndSend("/sub/" + gameStatus.getRoomId(),
                ResponseEntity.ok(GameData.builder()
                                          .type(TypeEnum.SELECT_PLAYER_TURN.name())
                                          .player(gameStatus.getCurrentPlayer().getUserId())
                                          .build())
        );

        // 자동 처리 로직
        GameData gameData = GameData.builder()
                .type(TypeEnum.SELECT_PLAYER.name())
                .requester(gameStatus.getCurrentPlayer().getUserId())
                .responser(randomPlayerId(gameStatus))
                .build();

        if (gameStatus.getCurrentPlayer().isBot()) { // 현재 플레이어가 봇일 경우
            turnTimer.schedule(() -> endTurn(gameData, gameStatus, turnTimer), randomResponseTime(gameStatus.getTurnTimeLimit()), TimeUnit.SECONDS);
        } else {                                     // 현재 플레이어가 봇이 아닐 경우
            turnTimer.schedule(() -> endTurn(gameData, gameStatus, turnTimer), gameStatus.getTurnTimeLimit(), TimeUnit.SECONDS);
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

    public void endTurn(GameData gameData, GameStatus gameStatus, ScheduledExecutorService turnTimer) {
        cancelTurnTimer(turnTimer);

        // 게임 내부 로직
        gameStatus.changeOpponentPlayer(gameData.getResponser());
        gameStatus.changeCurrentPhase();

        // subscriber 들에게 메시지 전달
        messagingTemplate.convertAndSend("/sub/" + gameStatus.getRoomId(), ResponseEntity.ok(gameData));

        latch.countDown();
    }

    public void handlePub(@Payload GameData gameData, GameStatus gameStatus, ScheduledExecutorService turnTimer) {
        // pub 처리
        if (TypeEnum.TEST_PLAYER.name().equals(gameData.getType())) {           // 질문 대상 떠보기
            messagingTemplate.convertAndSend("/sub/" + gameStatus.getRoomId(), gameData);
        } else if (TypeEnum.SELECT_PLAYER.name().equals(gameData.getType())) {  // 질문 대상 지목하기
            this.endTurn(gameData, gameStatus, turnTimer);
        }
    }

    public long randomPlayerId(GameStatus gameStatus) {
        Player opponentPlayer;
        Player currentPlayer = gameStatus.getCurrentPlayer();
        List<Player> playerList = gameStatus.getPlayerList();
        do {
            opponentPlayer = playerList.get((int) (Math.random() * playerList.size()));
        } while (currentPlayer.equals(opponentPlayer));

        return opponentPlayer.getUserId();
    }

    public long randomResponseTime(long timeLimit) {
        return Math.max(3, (int) (Math.random() * timeLimit / 2));
    }
}

