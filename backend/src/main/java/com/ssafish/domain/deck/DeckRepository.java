package com.ssafish.domain.deck;

import com.ssafish.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DeckRepository extends JpaRepository<Deck,Long> {

    void deleteAllByUser(User user);
    Deck findByDeckId(long deckId);
    List<Deck> findAllByUser(User user);

    @Query(value = "select * from decks d where d.deck_name = ?",nativeQuery = true)
    Deck findDeckName(String deckName);

