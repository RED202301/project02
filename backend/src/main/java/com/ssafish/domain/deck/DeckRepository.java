package com.ssafish.domain.deck;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DeckRepository extends JpaRepository<Deck,Long> {

    void deleteAllByUserId(long userId);

    List<Deck> findAllByUserId(long userId);
}
