package com.ssafish.web.dto;

import com.ssafish.domain.deck.Deck;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
public class DeckDto {
// 덱의 대표 정보와 포함된 카드 리스트를 담는 Dto

    private long deckId;
    private long userId;

    //대표정보
    private long cardId; //대표카드
    private String deckName;
    private String deckDescription;

    private int deckUsageCount;
    private LocalDateTime createdDate;
    private boolean isPublic;



    @Builder
    public DeckDto
            (long deckId, long cardId, long userId, String deckName, String deckDescription,int deckUsageCount ,boolean ispublic){
        this.deckId = deckId;
        this.cardId = cardId;
        this.userId = userId;
        this.deckName = deckName;
        this.deckDescription = deckDescription;
        this.deckUsageCount = deckUsageCount;
        this.isPublic = ispublic;

    }

    public Deck toEntity() {
        return Deck.builder()
                .deckId(deckId)
                .userId(userId)
                .cardId(cardId)
                .deckName(deckName)
                .deckDescription(deckDescription)
                .deckUsageCount(deckUsageCount)
                .isPublic(isPublic) // createDate 필요
                .build();
    }

}
