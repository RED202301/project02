package com.ssafish.domain.deck;

import com.ssafish.domain.card.Card;
import lombok.*;

import javax.persistence.*;

@ToString
@Getter
@NoArgsConstructor
@Table(name = "Card_decks")
@Entity
public class CardDeck {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_deck_id")
    private Long cardDeckId;

    @ManyToOne
    @JoinColumn(name = "card_id")
    private Card card;

    @ManyToOne
    @JoinColumn(name = "deck_id")
    private Deck deck;

    @Builder
    public CardDeck(Long cardDeckId, Card card, Deck deck) {
        this.cardDeckId = cardDeckId;
        this.card = card;
        this.deck = deck;
    }

}
