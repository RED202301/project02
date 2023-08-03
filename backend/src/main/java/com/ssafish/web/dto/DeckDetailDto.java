package com.ssafish.web.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
public class DeckDetailDto {
// 덱의 대표 정보와 포함된 카드 리스트를 담는 Dto

    private DeckDto deck;
    private List<CardDto> cardList;


//    @Builder
//    public DeckDetailDto
//            (DeckDto deck, List<CardDto> cardList){
//        this.deck = deck;
//        this.cardList = cardList;
//
//    }

//    public Card toEntity() {
//        return Card.builder()
//                .userId(userId)
//                .mainTitle(mainTitle)
//                .subTitle(subTitle)
//                .mainImgUrl(mainImgUrl)
//                .cardDescription(cardDescription)
//                .point(point)
//                .build();
//    }

}
