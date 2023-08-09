package com.ssafish.web.dto.Phase;

import com.ssafish.web.dto.GameData;
import com.ssafish.web.dto.GameStatus;
import com.ssafish.web.dto.Player;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Component
public class GameOverPhase extends Phase {

    protected final SimpMessageSendingOperations messagingTemplate;

    public void run(GameStatus gameStatus) {
        log.info(gameStatus.getRoomId() + "번 방 - GameOverPhase 시작");
        awaitSecond(1L);

        ScheduledExecutorService turnTimer = Executors.newSingleThreadScheduledExecutor();

        // 점수가 적인 플레이어 리스트를 보내준다
        messagingTemplate.convertAndSend("/sub/" + gameStatus.getRoomId(),
                ResponseEntity.ok(GameData.builder()
                              .type("END_GAME")
                              .players(gameStatus.getPlayerList())
                              .build()));

        awaitSecond(2L);

        // 우승자들을 골라서 보내준다
        int maxScore = gameStatus.getPlayerList().stream().map(Player::getScore).max(Comparator.naturalOrder()).orElse(0);
        List<Player> winners = gameStatus.getPlayerList().stream().filter(player -> player.getScore() == maxScore).collect(Collectors.toList());

        messagingTemplate.convertAndSend("/sub/" + gameStatus.getRoomId(),
                ResponseEntity.ok(GameData.builder()
                                          .type("WINNER_CEREMONY")
                                          .players(winners)
                                          .build()));

        log.info(gameStatus.getRoomId() + "번 방 게임 종료");
    }
}
