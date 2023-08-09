package com.ssafish.domain.card;

import com.ssafish.domain.BaseTimeEntity;
import com.ssafish.web.dto.CardDto;
import lombok.*;

import javax.persistence.*;

//@AllArgsConstructor
@ToString
@Getter
@Builder
@NoArgsConstructor
@Table(name = "Cards")
@Entity
public class Card extends BaseTimeEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_id", unique = true, nullable = false)
    private long cardId;

    //@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private long userId;


    @Column(name = "main_title" ,length = 10)
    private String mainTitle;

    @Column(name = "sub_title",length = 200)
    private String subTitle;

    @Column(name = "main_img_url",length = 200)
    private String mainImgUrl;

    @Column(name = "sub_img_url",length = 200)
    private String subImgUrl;

    @Column(name = "card_description",length = 20)
    private String cardDescription;

    @Column(name = "point")
    private int point;

//    @Column(name = "created_date")
//    @Temporal(TemporalType.DATE)
//    private Date createdDate;




    @Builder
    public Card
             (long cardId, long userId, String mainTitle, String subTitle,String mainImgUrl, String cardDescription,String subImgUrl, int point){
        this.cardId = cardId;
        this.userId = userId;
        this.mainTitle = mainTitle;
        this.subTitle = subTitle;
        this.mainImgUrl = mainImgUrl;
        this.subImgUrl = subImgUrl;
        this.cardDescription = cardDescription;
        this.point = point;

    }

    public CardDto toDto(){
        return CardDto.builder()
                .cardId(cardId)
                .userId(userId)
                .mainTitle(mainTitle)
                .mainImgUrl(mainImgUrl)
                .subTitle(subTitle)
                .subImgUrl(subImgUrl)
                .point(point)
                .build();
    }


}
