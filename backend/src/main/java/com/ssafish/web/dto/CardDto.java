package com.ssafish.web.dto;

import com.ssafish.domain.card.Card;
import com.ssafish.domain.user.User;
import com.ssafish.domain.user.UserRepository;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
//@AllArgsConstructor
@ToString
@Getter
@Setter
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

    private int result;


    @Builder
    public CardDto
            (long cardId, long userId, String mainTitle, String subTitle, String mainImgUrl, String subImgUrl, String cardDescription, int point , int result){
        this.cardId = cardId;
        this.userId = userId;
        this.mainTitle = mainTitle;
        this.subTitle = subTitle;
        this.mainImgUrl = mainImgUrl;
        this.subImgUrl = subImgUrl;
        this.cardDescription = cardDescription;
        this.point = point;
        this.result = result;
    }

    public Card toEntity(UserRepository userRepository) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("해당하는 유저가 없습니다."));

        return Card.builder()
                .user(user)
                .mainTitle(mainTitle)
                .subTitle(subTitle)
                .mainImgUrl(mainImgUrl)
                .subImgUrl(subImgUrl)
                .cardDescription(cardDescription)
                .point(point)
                .build();
    }

}
