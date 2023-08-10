package com.ssafish.web.controller;

import com.ssafish.service.CardDeckService;
import com.ssafish.web.dto.CardDto;
import com.ssafish.web.dto.DeckDetailDto;
import com.ssafish.web.dto.DeckDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
@Slf4j
public class DeckController {

    @Autowired
    CardDeckService cardDeckService;
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


//    @PostMapping("/deck/{deckId}")
//    public ResponseEntity<DeckDetailDto> deckCreate(@PathVariable int deckId, List<CardDto> CardList, DeckDto deck){
//        // 덱정보를 저장한다
//        // 카드덱 테이블에 삽입한다.
//        // 유저덱 에 삽입한다. -> 사용자의 보관함
//
//
//        return ResponseEntity.ok().body(deckDetailDto);
//    }





}
