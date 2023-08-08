package com.ssafish.web.dto.Phase;

import com.ssafish.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@Component
public class GameStartPhase extends Phase {

    protected final SimpMessageSendingOperations messagingTemplate;

    public void run(GameData gameData, GameStatus gameStatus) {
        turnTimer = Executors.newSingleThreadScheduledExecutor();

        // 게임이 시작되었음을 알리며 카드 데이터를 클라이언트들에게 보낸다
        messagingTemplate.convertAndSend("/sub/" + gameStatus.getRoomId(), gameData);

        // 중앙 덱 섞어서 세팅해놓는다
        List<CardDto> cardList = gameData.getCards();
        List<Long> middleDeck = gameStatus.getMiddleDeck();
        cardList.forEach(e -> {
            middleDeck.add(e.getCardId());
            middleDeck.add(e.getCardId());
            gameStatus.getPointMap().put(e.getCardId(), e.getPoint());
        });
        Collections.shuffle(middleDeck);


        // 각 플레이어에게 카드를 1장씩 주는 작업을 5번 반복한다
        // 서버 내부적으로는 1초 이내에 완료되지만, 이벤트 전달은 초 단위의 딜레이를 두고 이뤄진다
        long delaySec = 0L;
        List<Player> playerList = gameStatus.getPlayerList();
        for (int i = 0; i < 5; i++) {
            for (Player player : playerList) {
                Long cardDraw = middleDeck.remove(middleDeck.size() - 1);

                List<Long> handCurrent = player.getCardsOnHand();
                List<Long> enrollCurrent = player.getCardsEnrolled();

                turnTimer.schedule(() -> sendAutoDraw(gameStatus, player.getUserId(), cardDraw), 2L * ++delaySec, TimeUnit.SECONDS);
                // 카드가 requester 손패로 이동
                if (!handCurrent.contains(cardDraw)) {
                    handCurrent.add(cardDraw);
                } else {
                    // 짝이 있다면 등록패로 이동
                    handCurrent.remove(cardDraw);
                    enrollCurrent.add(cardDraw);

                    turnTimer.schedule(() -> sendEnroll(gameStatus, player.getUserId(), cardDraw), 2L * delaySec + 1L, TimeUnit.SECONDS);
                }
            }
        }

        gameStatus.setCurrentPlayer(gameStatus.getPlayerList().get(gameStatus.getCurrentPlayerIdx()));
        gameStatus.setCurrentPhase(gameStatus.getPersonChoosePhase());

        awaitSecond(2L * ++delaySec);
    }

    public void sendAutoDraw(GameStatus gameStatus, long userId, long cardDraw) {
        messagingTemplate.convertAndSend("/sub/" + gameStatus.getRoomId(),
                GameData.builder()
                        .type(TypeEnum.AUTO_DRAW.name())
                        .player(userId)
                        .cardId(cardDraw)
                        .build()
        );
    }

    public void sendEnroll(GameStatus gameStatus, long userId, long cardId) {
        messagingTemplate.convertAndSend("/sub/" + gameStatus.getRoomId(),
                GameData.builder()
                        .type(TypeEnum.ENROLL.name())
                        .player(userId)
                        .cardId(cardId)
                        .build()
        );
    }
}
