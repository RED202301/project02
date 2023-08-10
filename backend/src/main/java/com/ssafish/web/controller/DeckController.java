package com.ssafish.web.controller;

import com.ssafish.domain.deck.CardDeck;
import com.ssafish.domain.deck.Deck;
import com.ssafish.service.CardDeckService;
import com.ssafish.service.DeckService;
import com.ssafish.web.dto.CardDto;
import com.ssafish.web.dto.DeckDetailDto;
import com.ssafish.web.dto.DeckDto;
import com.ssafish.web.dto.DeckRequestDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
@Slf4j
public class DeckController {

    private final CardDeckService cardDeckService;
    private final DeckService deckService;

    public DeckController(CardDeckService cardDeckService, DeckService deckService) {
        this.cardDeckService = cardDeckService;
        this.deckService = deckService;
    }

    @GetMapping(value = "/deck/{deckId}")
    public ResponseEntity<DeckDetailDto> deckDetail(@PathVariable int deckId){

        DeckDto deck = cardDeckService.deckInfo(deckId);
        List<CardDto> deckCardList = cardDeckService.deckCardList(deckId);
        DeckDetailDto deckDetailDto = DeckDetailDto.builder()
                .deck(deck)
                .cardList(deckCardList)
                .build();

        System.out.println(deckDetailDto);

//        if( ) {
//            return ResponseEntity.ok().body(deckDetailDto);
//        }else {
//            return ResponseEntity.notFound().build();
//        }

        return ResponseEntity.ok().body(deckDetailDto);

    }


    @PostMapping("/deck")
    public ResponseEntity<Object> deckCreate(@RequestBody DeckRequestDto deckRequestDto){
        try {
            DeckRequestDto createdDeck = deckService.create(deckRequestDto);
            return ResponseEntity.status(HttpStatus.OK).body(createdDeck);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
    }
}
