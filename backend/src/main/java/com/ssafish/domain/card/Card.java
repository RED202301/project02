package com.ssafish.domain.card;

import com.ssafish.domain.BaseTimeEntity;
import com.ssafish.domain.deck.CardDeck;
import com.ssafish.domain.deck.Deck;
import com.ssafish.domain.user.User;
import com.ssafish.web.dto.CardDto;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@NoArgsConstructor
@Table(name = "Cards")
@Entity
public class Card extends BaseTimeEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_id", unique = true, nullable = false)
    private long cardId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "main_title" ,length = 15)
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

    @OneToMany(mappedBy = "card")
    private List<CardDeck> cardDecks = new ArrayList<>();

    @OneToMany(mappedBy = "card")
    private List<Deck> decks = new ArrayList<>();


    @Builder
    public Card
             (long cardId, User user, String mainTitle, String subTitle,String mainImgUrl, String subImgUrl,String cardDescription, int point){
        this.cardId = cardId;
        this.user = user;
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
                .userId(user.getUserId())
                .mainTitle(mainTitle)
                .mainImgUrl(mainImgUrl)
                .subTitle(subTitle)
                .cardDescription(cardDescription)
                .subImgUrl(subImgUrl)
                .point(point)
                .build();
    }


}
