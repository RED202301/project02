package com.ssafish.web.dto;

import com.ssafish.domain.card.Card;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
public class CardDto {

    private long cardId;
    private long userId;
    private String mainTitle;
    private String subTitle;
    private String mainImgUrl;
    private String subImgUrl;
    private String cardDescription;
    private int point;
    private LocalDateTime createdDate;


    @Builder
    public CardDto
            (long cardId, long userId, String mainTitle, String subTitle, String mainImgUrl, String subImgUrl, String cardDescription, int point ){
        this.cardId = cardId;
        this.userId = userId;
        this.mainTitle = mainTitle;
        this.subTitle = subTitle;
        this.mainImgUrl = mainImgUrl;
        this.subImgUrl = subImgUrl;
        this.cardDescription = cardDescription;
        this.point = point;

    }

    public Card toEntity() {
        return Card.builder()
                .userId(userId)
                .mainTitle(mainTitle)
                .subTitle(subTitle)
                .mainImgUrl(mainImgUrl)
                .subImgUrl(subImgUrl)
                .cardDescription(cardDescription)
                .point(point)
                .build();
    }

}
