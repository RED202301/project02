package com.ssafish.web.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@ToString
@Getter
public class DeckRequestDto {
    private DeckDto deck;
    private List<Long> cardIdList;


    @Builder
    public DeckRequestDto
            (DeckDto deck, List<Long> cardIdList){
        this.deck = deck;
        this.cardIdList = cardIdList;

    }
}
