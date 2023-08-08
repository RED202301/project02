package com.ssafish.web.dto;

import com.ssafish.web.dto.Phase.*;
import lombok.*;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@Getter
@Setter
@RequiredArgsConstructor
@Component
@Scope("prototype")
public class GameStatus {
    private final PersonChoosePhase personChoosePhase;
    private final CardChoosePhase cardChoosePhase;
    private final ReplyChoosePhase replyChoosePhase;

    private long roomId;
    private long turnTimeLimit;

    private List<Player> playerList = new ArrayList<>(); // userId의 리스트: 플레이어들의 순서를 나타낸다
    private List<Long> middleDeck = new ArrayList<>(); // 중앙 덱에 있는 cardId 리스트
    private Map<Long, Integer> pointMap;

    private ChoosePhase currentPhase;
    private Player currentPlayer;
    private Player opponentPlayer;

    private boolean isGameOver;
    private int currentPlayerIdx;
    private long cardOpen;

    public void addPlayer(long userId, String nickname, boolean isBot) {
        playerList.add(Player.builder()
                .userId(userId)
                .nickname(nickname)
                .isBot(isBot)
                .build());
    }

    public void removePlayer(long userId) {
        playerList.removeIf(e -> e.getUserId() == userId);
    }

    public void changeCurrentPlayer() {
        currentPlayerIdx = (currentPlayerIdx + 1) % playerList.size();
        currentPlayer = playerList.get(currentPlayerIdx);
    }

    public void changeOpponentPlayer(long userId) {
        opponentPlayer = playerList.stream().filter(e -> e.getUserId() == userId).findAny().orElse(null);
    }

    public void changeCurrentPhase() {
        if (currentPhase.equals(personChoosePhase)) currentPhase = cardChoosePhase;
        else if (currentPhase.equals(cardChoosePhase)) currentPhase = replyChoosePhase;
        else if (currentPhase.equals(replyChoosePhase)) currentPhase = personChoosePhase;
    }
}
