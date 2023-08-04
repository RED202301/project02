package com.ssafish.web.dto;

import com.ssafish.web.dto.Phase.Phase;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@Getter
@Setter
@NoArgsConstructor
public class GameStatus {
    private int roomId;

    List<Phase> phases;
    List<Integer> playerOrder; // userId의 리스트: 플레이어들의 순서를 나타낸다
    Map<Integer, Player> players; // key: userId, value: Player 객체
    List<Integer> middleDeck; // 중앙 덱에 있는 cardId 리스트
    List<Integer> onHandCards; // 플레이어들의 손에 있는 cardId 리스트

    Phase currentPhase;
    Player currentPlayer;
    Player opponentPlayer;

    private boolean isGameOver;
    private int currentPhaseIdx;
    private int currentPlayerIdx;
    private int cardOpen;

    public GameStatus(List<Integer> playerOrder, List<Integer> middleDeck) {
        this.playerOrder = playerOrder;
        this.middleDeck = middleDeck;

        this.players = new ConcurrentHashMap<>();
        for (Integer userId : playerOrder) {
            players.put(userId, new Player());
        }
    }

    public void changeCurrentPlayer() {
        currentPlayerIdx = (currentPlayerIdx + 1) % playerOrder.size();
        currentPlayer = players.get(playerOrder.get(currentPlayerIdx));
    }

    public void changeOpponentPlayer(int userId) {
        opponentPlayer = players.get(userId);
    }

    public void changeCurrentPhase() {
        currentPhaseIdx = (currentPhaseIdx + 1) % phases.size();
        currentPhase = phases.get(currentPhaseIdx);
    }
}
