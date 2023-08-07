package com.ssafish.service;

import com.ssafish.domain.card.Card;
import com.ssafish.domain.card.CardsRepository;
import com.ssafish.web.dto.CardDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CardService {

    @Value("${app.fileupload.uploadPath}")
    String uploadPath;


    @Autowired
    CardsRepository cardsRepository;

    //해당 덱의 정보 읽어오기
//    public DeckDto deckInfo(long deckId){
//
//        return deckRepository.findById(deckId).orElse(null).toDto();
//
//    }

    // 카드 정보 저장하기


    //해당덱의 모든 카드 정보 읽어오기 ! 수정중
    public List<CardDto> deckCardList(long deckId){
    //List<Card_decks>를 반환하도록한다.// 해당덱의 카드리스트를 넘겨준다.

        List<Card> d = cardsRepository.findCardDeckList(deckId);

        List<CardDto> cardList = new ArrayList<>();
        d.forEach((card) -> cardList.add(card.toDto()));
        return cardList;
    }

//    public DeckDetailDto deckDetail(long deckId){
//
//        Deck deck = deckRepository.findById(deckId).orElse(null);
//
//        List<CardDto> cardList = null ;//join필요
//
//
//
//        DeckDetailDto deckDetailDto = new DeckDetailDto(deck.toDto(),cardList);
//
//        return deckDetailDto;
//    }
}
