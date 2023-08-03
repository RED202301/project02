package com.ssafish.domain.card;

import com.ssafish.domain.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;
@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Cards")
@Entity
public class Card extends BaseTimeEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_id", unique = true, nullable = false)
    private long cardId;

    //@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "use_id", unique = true, nullable = false)
    private long userId;


    @Column(name = "main_title" ,unique = false ,nullable = true , length = 10)
    private String mainTitle;

    @Column(name = "sub_title",unique = false ,nullable = true,length = 200)
    private String subTitle;

    @Column(name = "main_img_url",unique = false ,nullable = true,length = 200)
    private String mainImgUrl;

    @Column(name = "sub_img_url",unique = false ,nullable = true,length = 200)
    private String subImgUrl;

    @Column(name = "card_description",unique = false ,nullable = true,length = 20)
    private String cardDescription;

    @Column(name = "point",unique = false ,nullable = true)
    private int point;

//    @Column(name = "created_date")
//    @Temporal(TemporalType.DATE)
//    private Date createdDate;




    @Builder
    public Card(long cardId, long userId, String mainTitle, String subTitle,String mainImgUrl ){
        this.cardId = cardId;
        this.userId = userId;
        this.mainTitle = mainTitle;
        this.subTitle = subTitle;
        this.mainImgUrl = mainImgUrl;

    }


}
