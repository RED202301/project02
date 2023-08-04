package com.ssafish.domain.deck;

import org.springframework.data.jpa.repository.JpaRepository;


public interface Card_deckRepository extends JpaRepository<Card_decks, Long> {

    //deckId 와 매핑된 모든 cardId를 반환한다.
  //  List<Long> findAllCardIdByDeckId(long deckId);




    //List<Card> findCardDeckList(long deckId);
}



