package com.ssafish.web.dto;

import lombok.*;
import java.util.List;

@Getter
@Data
@NoArgsConstructor
public class GameData {

    private String type; // 데이터 타입
    private long from; // 주는 사람 userId
    private long to; // 받는 사람 userId
    private long cardId; // (카드 관련일 경우) 전달되는 카드
    private long player; // 해당되는 사람
    private long requester; // 질문하는 사람
    private long responser; // 대답하는 사람
    private boolean isGoFish;
    private List<CardDto> cards; // 25장의 카드들
    private List<Player> players;

    @Builder
    public GameData(String type, long from, long to, long cardId, long player,
                    long requester, long responser, boolean isGoFish, List<CardDto> cards, List<Player> players) {
        this.type = type;
        this.from = from;
        this.to = to;
        this.cardId = cardId;
        this.player = player;
        this.requester = requester;
        this.responser = responser;
        this.isGoFish = isGoFish;
        this.cards = cards;
        this.players = players;
    }
}
