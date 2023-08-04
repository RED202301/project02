package com.ssafish.domain.deck;

import lombok.*;

import javax.persistence.*;

@ToString
@Getter
@Builder
//@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Card_decks")
@Entity
public class CardDeck {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_deck_id", unique = true, nullable = false)
    private Long cardDeckId;

    //@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id", unique = true, nullable = false)
    private Long cardId;

    //@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deck_id", unique = true, nullable = false)
    private Long deckId;

    @Builder
    public CardDeck(Long cardDeckId, Long cardId,Long deckId ){
        this.cardDeckId = cardDeckId;
        this.cardId = cardId;
        this.deckId = deckId;
    }





}
