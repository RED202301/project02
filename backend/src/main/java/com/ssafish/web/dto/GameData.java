package com.ssafish.web.dto;

import lombok.*;
import java.util.Map;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameData {

    private String type; // 데이터 타입
    private Integer from; // 주는 사람 userId
    private Integer to; // 받는 사람 userId
    private Integer cardId; // (카드 관련일 경우) 전달되는 카드
    private Integer player; // 해당되는 사람
    private Integer requester; // 질문하는 사람
    private Integer responser; // 대답하는 사람
    private Map<String, Object> cards; // 25장의 카드들
}
