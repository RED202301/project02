package com.ssafish.web.controller;


import com.ssafish.domain.deck.Deck;
import com.ssafish.domain.deck.DeckRepository;
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

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
@Slf4j
public class DeckController {

    private final CardDeckService cardDeckService;
    private final DeckService deckService;

    @Autowired
    DeckRepository deckRepository;

    public DeckController(CardDeckService cardDeckService, DeckService deckService) {
        this.cardDeckService = cardDeckService;
        this.deckService = deckService;
    }


    @GetMapping("/deck")
    public ResponseEntity<List<DeckDetailDto>> allDeckList(){

        List<Deck> deckList = deckRepository.findAll();
        System.out.println(deckList);
        List<DeckDetailDto> alldDeckList = new ArrayList<>();

        deckList.forEach((deck) -> {

            List<CardDto> deckCardList = cardDeckService.deckCardList(deck.getDeckId());
            if(deckCardList.size()==25){
            DeckDetailDto deckDetailDto = DeckDetailDto.builder()
                    .deck(deck.toDto())
                    .cardList(deckCardList)
                    .build();
            alldDeckList.add(deckDetailDto);
            }
        });


        return ResponseEntity.ok().body(alldDeckList);

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


    @DeleteMapping("/deck/{userId}")
    public ResponseEntity<Object> deckDelete(@PathVariable long userId) {
        cardDeckService.delete(userId);
        deckService.delete(userId);
        return ResponseEntity.status(HttpStatus.OK).body("Delete all decks");
    }

    // 추가 부분1. : 모든 덱의 간략 정보만 반환한다.
    @GetMapping("/deck/deckTitle")
    public ResponseEntity<List<String>> deckTitle(){
        //
//        List<Deck> deckList = deckRepository.findAll();
//        List<DeckDto> deckDtoList = new ArrayList<>();
//        deckList.forEach((deck) -> deckDtoList.add(deck.toDto()));


        List<Deck> deckList = deckRepository.findAll();
        List<String> deckNameList = new ArrayList<>();
        deckList.forEach((deck) -> deckNameList.add(deck.getDeckName()));


        return ResponseEntity.ok().body(deckNameList);

    }

    // 추가 부분2.: 덱의 String으로만 제공한다.
    @GetMapping("/deck/deckCards")
    public ResponseEntity<DeckDetailDto> deckCards(@RequestParam(value="deckName", required = false, defaultValue = "위인 모음집") String deckName){
        //해당 덱 아이디를 찾는다.
//        Deck inputdeck = Deck.builder()
//                .deckName(deckName)
//                .build();

        Deck inputdeck = deckService.findDeckName(deckName);
        // 해당 카드 리스트를 읽어온다.


        List<CardDto> deckCardList = cardDeckService.deckCardList(inputdeck.getDeckId());
        DeckDetailDto deckDetailDto = DeckDetailDto.builder()
                .deck(inputdeck.toDto())
                .cardList(deckCardList)
                .build();


        return ResponseEntity.ok().body(deckDetailDto);

    }
}
