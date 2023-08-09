package com.ssafish;

import com.ssafish.domain.card.Card;
import com.ssafish.domain.card.CardsRepository;
import com.ssafish.domain.deck.CardDeckRepository;
import com.ssafish.domain.deck.DeckRepository;
import com.ssafish.service.CardDeckService;
import com.ssafish.service.CardService;
import com.ssafish.web.dto.CardDto;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RequiredArgsConstructor
@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class CardTests {


    @Autowired
    CardsRepository cardsRepository;
    @Autowired
    DeckRepository deckRepository;

    @Autowired
    CardDeckService cardDeckService;

    @Autowired
    CardService cardService;
    @Autowired
    CardDeckRepository cardDeckRepository;




    //1. 25장의 카드 읽기 테스트
    @Test
    @Order(1)
    void testcardListService(){

        //카드 읽어오기 테스트
        Card card = cardsRepository.findByCardId(1);
        System.out.println(card);

        List<CardDto> cardList = cardDeckService.deckCardList(1);
        //System.out.println(cardList);

        assertEquals(25,cardList.size());
        //assertIterableEquals(expected,list);

    }


// 삭제 테스트
//    @Test
//    @Order(1)
//    void deleteDefaultCardsToDB() {
//
//        cardsRepository.deleteAllInBatch();
//        long a = cardsRepository.count();
//
//        assertEquals(0, a);
//
//    }




//    @Test
//    @Order(2)
//    void testmember() {
//
//        Card cards = Card.builder()
//                .userId(123)
//                .build();
//
//        System.out.println(cards);
//        cardsRepository.save(cards);
//
//    }

//    @Test
//    @Order(3)
//    void s() {
//
//        Member cards = Member.builder()
//                .userId(123L)
//                .build();
//
//        System.out.println(cards);
//        memberRepository.save(cards);
//
//    }

}
