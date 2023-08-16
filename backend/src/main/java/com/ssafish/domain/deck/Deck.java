package com.ssafish.domain.deck;

import com.ssafish.domain.BaseTimeEntity;
import com.ssafish.domain.card.Card;
import com.ssafish.domain.user.User;
import com.ssafish.web.dto.DeckDto;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Table(name = "Decks")
@Entity
public class Deck extends BaseTimeEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deck_id", unique = true, nullable = false)
    private long deckId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "card_id")
    private Card card;

    @Column(name = "deck_name", length = 10)
    private String deckName;

    @Column(name = "deck_desciption", length = 500)
    private String deckDescription;

    @Column(name = "deck_usage_count")
    private int deckUsageCount;

    @Column(name = "is_public")
    private boolean isPublic;

    @OneToMany(mappedBy = "deck")
    private List<CardDeck> cardDecks = new ArrayList<>();

    @Builder
    public Deck(long deckId, User user, Card card,
                String deckName, String deckDescription,
                int deckUsageCount, boolean isPublic){

       this.deckId = deckId;
       this.user = user;
       this.card = card;
       this.deckName = deckName;
       this.deckDescription = deckDescription;
       this.deckUsageCount = deckUsageCount;
       this.isPublic = isPublic;
    }
    public DeckDto toDto(){
        return DeckDto.builder()
                .deckId(deckId)
                .userId(user.getUserId())
                .cardId(card.getCardId())
                .deckName(deckName)
                .deckDescription(deckDescription)
                .deckUsageCount(deckUsageCount)
                .ispublic(isPublic)
                .build();
    }
}
