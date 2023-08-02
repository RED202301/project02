package com.ssafish.domain.deck;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Card_decks")
@Entity
public class Card_decks {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_deck_id", unique = true, nullable = false)
    private int cardDeckId;

    //@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id", unique = true, nullable = false)
    private int cardId;

    //@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deck_id", unique = true, nullable = false)
    private int deckId;





}
