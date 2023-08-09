package com.ssafish.domain.card;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@ToString
@Getter
@Builder
//@AllArgsConstructor
@NoArgsConstructor
@Table(name = "User_Cards")
@Entity
public class UserCard{


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_user_id", unique = true, nullable = false)
    private long cardUserId;

    //@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private long userId;


    //@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id", unique = true, nullable = false)
    private long cardId;

    @Builder
    public UserCard
             (long cardUserId, long userId, long cardId){
        this.cardUserId = cardUserId;
        this.userId = userId;
        this.cardId = cardId;

    }


}
