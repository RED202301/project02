package com.ssafish.service;

import com.ssafish.domain.deck.Deck;
import com.ssafish.domain.deck.DeckRepository;
import com.ssafish.web.dto.CardDto;
import com.ssafish.web.dto.DeckDetailDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardDeckService {

    @Autowired
    DeckRepository deckRepository;

    public DeckDetailDto deckDetail(long deckId){
 
        Deck deck = deckRepository.findById(deckId).orElse(null);

        List<CardDto> cardList = null ;//join필요
        
        DeckDetailDto deckDetailDto = DeckDetailDto(deck.toDto(),cardList);

        return deckDetailDto;
    }
}
