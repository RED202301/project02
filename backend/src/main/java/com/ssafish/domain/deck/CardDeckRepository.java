package com.ssafish.domain.deck;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface CardDeckRepository extends JpaRepository<CardDeck, Long> {

    //deckId 와 매핑된 모든 cardId를 반환한다.
  //  List<Long> findAllCardIdByDeckId(long deckId);




    //List<Card> findCardDeckList(long deckId);

    @Modifying
    @Query("DELETE FROM CardDeck cd WHERE cd.deck.id = :deckId")
    void deleteAllByDeckId(@Param("deckId") long deckId);
    @Query(value = " select deck_id from card_decks where card_id = ?",nativeQuery = true)
    long findCard(long cardId);
}



