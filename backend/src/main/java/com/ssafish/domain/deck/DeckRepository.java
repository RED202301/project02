package com.ssafish.domain.deck;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DeckRepository extends JpaRepository<Deck,Long> {

    void deleteAllByUserId(long userId);

    List<Deck> findAllByUserId(long userId);

    @Query(value = "select * from decks d where d.deck_name = ?",nativeQuery = true)
    Deck findDeckName(String deckName);
}
