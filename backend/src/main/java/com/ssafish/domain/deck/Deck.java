package com.ssafish.domain.deck;

import lombok.*;
import javax.persistence.*;
import java.util.*;

@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Decks")
@Entity
public class Deck {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deck_id", unique = true, nullable = false)
    private long deckId;

    //@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private long userId;

    //@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id", unique = true, nullable = false)
    private long cardId;

    @Column(name = "deck_name")
    private String deckName;

    @Column(name = "deck_desciption")
    private String deckDesciption;

    @Column(name = "user_usage_count")
    private int userUsageCount;

    @Column(name = "create_date")
    @Temporal(TemporalType.DATE)
    private Date createDate;

    @Column(name = "is_public")
    private int isPublic;



}
