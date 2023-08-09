package com.ssafish;

import com.ssafish.domain.card.Card;
import com.ssafish.domain.card.CardsRepository;
import com.ssafish.domain.deck.CardDeck;
import com.ssafish.domain.deck.CardDeckRepository;
import com.ssafish.domain.deck.Deck;
import com.ssafish.domain.deck.DeckRepository;
import com.ssafish.service.CardDeckService;
import com.ssafish.service.CardService;
import com.ssafish.web.dto.CardDto;
import com.ssafish.web.dto.DeckDto;
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


    // 카드 서비스 확인
    @Test
    @Order(2)
    void testCardInsertService(){


        CardDto cardDto = CardDto.builder()
                .cardDescription("testcard")
                .cardId(1)
                .mainImgUrl("https://i9e202.p.ssafy.io/card_images/people_imgs/1_%EB%8B%A8%EA%B5%B0%EC%99%95%EA%B2%80.png")
                .mainTitle("testTitle")
                .build();

        //cardService.cardInsert(cardDto,);



    }
    //더미 데이터 저장
    @Test
    @Order(2)
    void testdeckInfoService(){

        //더미 데이터 저장 및 확인
        Deck deck = Deck.builder()
                .userId(1)
                .deckId(1)
                .cardId(2)
                .deckName("위인 모음집")
                .deckDescription("위인 카드로 게임을 플레이하고, 익혀봅시다")
                .deckUsageCount(1)
                .isPublic(true)
                .build();

        deckRepository.save(deck);
        
        // select 확인
        DeckDto deckDto = cardDeckService.deckInfo(1);

        System.out.println(deckDto);
        assertEquals("위인 모음집", deckDto.getDeckName());


    }

        @Test // 카드 덱 테이블 더미 데이터
    @Order(3)
    void setDefaultDeckCardsToDB(){

            cardDeckRepository.deleteAllInBatch();

        long decknum = 1;
        long cardIdnum =1;
        for(int i=0;i<25;i++){

            CardDeck card_decks = CardDeck.builder()
                    .cardDeckId(cardIdnum)
                    .cardId(cardIdnum)
                    .deckId(decknum)
                    .build();
            cardDeckRepository.save(card_decks);
            cardIdnum++;

        }



    }


    @Test
    @Order(1)
    void setDefaultCardsToDB() {

        cardsRepository.deleteAllInBatch();
        String [] titles = {"단군왕검", "공자", "광개토대왕","나폴레옹, ","뉴턴",
                "데카르트", "레오나르도다빈치","세종대왕", "이순신", "마리 퀴리",
                "마크 저커버그","선다 피차이", "일론 머스크", "제프 베이조스", "홉스",
                "칸트",  "아리스토텔레스","소크라테스","율곡이이", "퇴계이황",
                "찰스다윈", "에디슨","아인슈타인","아이젠하워","이재용"};
        String [] subtitle = {"고조선","논어", "고구려 19대 왕", "프랑스 황제", "만유인력",
                "심신이원론", "모나리자","훈민정음", "충무공","라듐/폴로늄",
                "메타", "구글","테슬라", "아마존", "리바이어던",
                "순수이성비판","오르가논","산파술","이기일원론","성학십도",
                "진화론","전구","상대성이론","노르망디 상륙작전", "삼성"};

        //프로퍼티에 추가해야할 내용, 구분자 리눅스에 맞게 확인하기
        //app.fileupload.uploadPath=C:\\SSAFY\\springboot\\springboot\\BoardWebFileUploadSpringBootMybatisVueVuex\\src\\main\\resources\\static
// https://i9e202.p.ssafy.io/card_images/people_imgs/1_%EB%8B%A8%EA%B5%B0%EC%99%95%EA%B2%80.png
        //String uploadPath = "http://i9e202.p.ssafy.io/home/ubuntu/ssafish/cardMainImage";
        String uploadPath = "https://i9e202.p.ssafy.io/card_images";

        String [] mainImgUrl = {"/people_imgs/1_단군왕검.png","/people_imgs/2_공자.png","/people_imgs/3_광개토대왕.png", "/people_imgs/4_나폴레옹.png",
                "/people_imgs/5_뉴턴.png", "/people_imgs/6_데카르트.png","/people_imgs/7_레오나르도다빈치.png","/people_imgs/8_세종대왕.png",
                "/people_imgs/9_이순신.png","/people_imgs/10_마리퀴리.png","/people_imgs/11_마크_저커버그_메타.png","/people_imgs/12_선다_피차이_구글.png",
                "/people_imgs/13_일론_머스크_테슬라.png","/people_imgs/14_제프_베이조스_아마존.png",
                "/people_imgs/15_홉스.png","/people_imgs/16_칸트.png",
                "/people_imgs/17_아리스토텔레스.png","/people_imgs/18_소크라테스.png",
                "/people_imgs/19_율곡이이.png","/people_imgs/20_퇴계이황.png",
                "/people_imgs/21_찰스다윈.png","/people_imgs/22_에디슨.png",
                "/people_imgs/23_아인슈타인.png","/people_imgs/24_아이젠하워.png","/people_imgs/25_이재용.png"};

        for(int i=0;i<25;i++){
            CardDto cardDto = new CardDto();
            cardDto.setCardId(i);
            cardDto.setMainTitle(titles[i]);
            cardDto.setSubTitle(subtitle[i]);
            cardDto.setMainImgUrl(uploadPath + mainImgUrl[i]);
            Card cards = cardDto.toEntity();
            cardsRepository.save(cards);
        }

    }

    //서비스 테스트

    //25장의 카드 읽기 테스트
    @Test
    @Order(4)
    void testcardListService(){

        //카드 읽어오기 테스트
        Card card = cardsRepository.findByCardId(1);
        System.out.println(card);

        List<CardDto> cardList = cardDeckService.deckCardList(1);
        //System.out.println(cardList);

        assertEquals(25,cardList.size());
        //assertIterableEquals(expected,list);

    }

   

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
//    @Order(3)
//    void setDefaultDeckToDB() {
//        DeckDto deckDto = DeckDto.builder()
//                .deckId(1)
//                .cardId(0)
//                .userId(1)
//                .deckName("위인 모음집")
//                .deckDescription("세계적인 위인들로 게임을 플레이하고, 익혀봅시다. ")
//                .deckUsageCount(1)
//                .ispublic(true).build();
//
//        Deck deck = deckDto.toEntity();
//        deckRepository.save(deck);
//
////        DeckDetailDto deckDetailDto = DeckDetailDto.builder()
////                .deck(deckDto)
////                .cardList(cardList)
////                .build();
//
////    }



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
