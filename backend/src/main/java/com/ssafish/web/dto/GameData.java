package com.ssafish.web.dto;

import lombok.*;
import java.util.Map;

@Getter
@Data
@NoArgsConstructor
public class GameData {

    private String type; // 데이터 타입
    private Integer from; // 주는 사람 userId
    private Integer to; // 받는 사람 userId
    private Integer cardId; // (카드 관련일 경우) 전달되는 카드
    private Integer player; // 해당되는 사람
    private Integer requester; // 질문하는 사람
    private Integer responser; // 대답하는 사람
    private boolean isGoFish;
    private Map<String, Object> cards; // 25장의 카드들

    @Builder
    public GameData(String type, Integer from, Integer to, Integer cardId, Integer player,
                    Integer requester, Integer responser, boolean isGoFish, Map<String, Object> cards) {
        this.type = type;
        this.from = from;
        this.to = to;
        this.cardId = cardId;
        this.player = player;
        this.requester = requester;
        this.responser = responser;
        this.isGoFish = isGoFish;
        this.cards = cards;
    }

}
