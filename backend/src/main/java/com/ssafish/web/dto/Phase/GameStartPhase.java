package com.ssafish.web.dto.Phase;

import com.ssafish.service.RoomService;
import com.ssafish.web.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Slf4j
@RequiredArgsConstructor
@Component
public class GameStartPhase extends Phase {

    protected final RoomService roomService;

    public void run(GameData gameData, GameStatus gameStatus) {
        log.info(gameStatus.getRoomId() + "번 방 - GameStartPhase 시작");
        ScheduledExecutorService turnTimer = Executors.newSingleThreadScheduledExecutor();

        // 게임이 시작되었음을 알리며 카드 데이터를 클라이언트들에게 보낸다
        roomService.sendMessageToRoom(gameStatus.getRoomId(), ResponseEntity.ok(gameData));

        // 중앙 덱 섞어서 세팅해놓는다
        List<CardDto> cardList = gameData.getCards();
        List<Long> middleDeck = gameStatus.getMiddleDeck();
        cardList.forEach(e -> {
            middleDeck.add(e.getCardId());
            middleDeck.add(e.getCardId());
            gameStatus.getPointMap().put(e.getCardId(), e.getPoint());
        });
        Collections.shuffle(middleDeck);
        log.info(gameStatus.getRoomId() + "번 방의 중앙 덱 카드 개수: " + middleDeck.size());

        // 각 플레이어에게 카드를 1장씩 주는 작업을 5번 반복한다
        // 서버 내부적으로는 1초 이내에 완료되지만, 이벤트 전달은 초 단위의 딜레이를 두고 이뤄진다
        long delaySec = 0L;
        List<Player> playerList = gameStatus.getPlayerList();
        for (int i = 0; i < 5; i++) {
            for (Player player : playerList) {
                Long cardDraw = middleDeck.remove(middleDeck.size() - 1);

                List<Long> handCurrent = player.getCardsOnHand();
                List<Long> enrollCurrent = player.getCardsEnrolled();

                turnTimer.schedule(() -> sendAutoDraw(gameStatus, player.getUserId(), cardDraw), 500L * ++delaySec, TimeUnit.MILLISECONDS);
                // 카드가 requester 손패로 이동
                if (!handCurrent.contains(cardDraw)) {
                    handCurrent.add(cardDraw);
                } else {
                    // 짝이 있다면 등록패로 이동
                    handCurrent.remove(cardDraw);
                    enrollCurrent.add(cardDraw);
                    gameStatus.getCheatSheet().remove(cardDraw);
                    player.addScore(gameStatus.getPointMap().get(cardDraw));

                    turnTimer.schedule(() -> sendEnroll(gameStatus, player.getUserId(), cardDraw), 500L * delaySec + 250L, TimeUnit.MILLISECONDS);
                }
            }
        }

        gameStatus.setCurrentPlayer(gameStatus.getPlayerList().get(gameStatus.getCurrentPlayerIdx()));
        gameStatus.setCurrentPhase(gameStatus.getPersonChoosePhase());

        awaitSecond((500L * ++delaySec / 1000) + 1L);
    }

    public void sendAutoDraw(GameStatus gameStatus, long userId, long cardDraw) {
        roomService.sendMessageToRoom(gameStatus.getRoomId(),
                ResponseEntity.ok(GameData.builder()
                              .type(TypeEnum.AUTO_DRAW.name())
                              .player(userId)
                              .cardId(cardDraw)
                              .build())
        );
    }

    public void sendEnroll(GameStatus gameStatus, long userId, long cardId) {
        roomService.sendMessageToRoom(gameStatus.getRoomId(),
                ResponseEntity.ok(GameData.builder()
                                          .type(TypeEnum.ENROLL.name())
                                          .player(userId)
                                          .cardId(cardId)
                                          .build())
        );
    }
}
