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

import static org.junit.jupiter.api.Assertions.assertEquals;

@RequiredArgsConstructor
@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class CardInsertTest {


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





//인물카드 입력
// 1. 기본 덱 정보 삽입
    @Test
    @Order(1)
    void setPeopleCardsToDB() {

//        cardsRepository.deleteAllInBatch();
        String [] titles = {"단군왕검", "공자", "광개토대왕","나폴레옹","뉴턴",
                "데카르트", "레오나르도다빈치","세종대왕", "이순신", "마리 퀴리",
                "마크 저커버그","선다 피차이", "일론 머스크", "제프 베이조스", "홉스",
                "칸트",  "아리스토텔레스","소크라테스","율곡이이", "퇴계이황",
                "찰스다윈", "에디슨","아인슈타인","아이젠하워","이재용"};
        String [] subtitle = {"고조선","논어", "고구려 19대 왕", "프랑스 황제", "만유인력",
                "심신이원론", "모나리자","훈민정음", "충무공","라듐/폴로늄",
                "메타", "구글","테슬라", "아마존", "리바이어던",
                "순수이성비판","오르가논","산파술","이기일원론","성학십도",
                "진화론","전구","상대성이론","노르망디 상륙작전", "삼성"};


// https://i9e202.p.ssafy.io/card_images/people_imgs/1_%EB%8B%A8%EA%B5%B0%EC%99%95%EA%B2%80.png
        //String uploadPath = "http://i9e202.p.ssafy.io/home/ubuntu/ssafish/cardMainImage";
        String uploadPath = "https://i9e202.p.ssafy.io/main_images";

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
            cardDto.setMainTitle(titles[i]);
            cardDto.setSubTitle(subtitle[i]);
            cardDto.setMainImgUrl(uploadPath + mainImgUrl[i]);
            cardDto.setUserId(1);
            Card cards = cardDto.toEntity();
            cardsRepository.save(cards);
        }

    }


    //2. 기본 덱정보 삽입
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
    // 카드 덱 테이블 더미 데이터 삽입
    @Test
    @Order(3)
    void setDefaultDeckCardsToDB(){

//            cardDeckRepository.deleteAllInBatch();

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


    //유저 카드 테이블 더미 데이터 삽입

    //나라 카드 입력
    @Test
    @Order(5)
    void setNationCardsToDB() {

//        cardsRepository.deleteAllInBatch();
        String [] titles = {"아크라","반줄","오슬로","서울","코펜하겐",
                "모스크바","룩셈부르크","쿠알라룸푸르","멕시코 시티","소피아",
                "브라질리아","리야드","마드리드","싱가포르","런던",
                "캔버라","테헤란","평양","산티아고","오타와",
                "보고타","앙카라","리마","헬싱키","부다페스트"};
        String [] subtitle = {"가나","감비아","노르웨이","대한민국","덴마크",
                "러시아","룩셈부르크","말레이시아" ,"멕시코", "불가리아",
                "브라질","사우디아라비아","스페인", "싱가포르","영국",
                "오스트레일리아","이란","조선민주주의인민공화국", "칠레","캐나다",
                "콜롬비아","튀르키예","페루","핀란드","헝가리"};


// https://i9e202.p.ssafy.io/card_images/people_imgs/1_%EB%8B%A8%EA%B5%B0%EC%99%95%EA%B2%80.png
        //String uploadPath = "http://i9e202.p.ssafy.io/home/ubuntu/ssafish/cardMainImage";
        String uploadPath = "https://i9e202.p.ssafy.io/main_images";

        String [] mainImgUrl = {
                "/nation_imgs/가나_아크라.png","/nation_imgs/감비아_반줄.jpg","/nation_imgs/노르웨이_오슬로.png","/nation_imgs/대한민국_서울.jpg",
                "/nation_imgs/덴마크_코펜하겐.jpg","/nation_imgs/러시아_모스크바.jpg","/nation_imgs/룩셈부르크_룩셈부르크.jpg","/nation_imgs/말레이시아_쿠알라룸푸르.jpg",
                "/nation_imgs/멕시코_멕시코시티.jpg","/nation_imgs/불가리아_소피아.jpg","/nation_imgs/브라질_브라질리아.jpg","/nation_imgs/사우디아라비아_리야드.jpg",
                "/nation_imgs/스페인_마드리드.jpg","/nation_imgs/싱가포르_싱가포르.jpg", "/nation_imgs/영국_런던.jpg","/nation_imgs/오스트레일리아_캔버라.jpg",
                "/nation_imgs/이란_테헤란.jpg","/nation_imgs/조선민주주의인민공화국_평양.png", "/nation_imgs/칠레_산티아고.jpg","/nation_imgs/캐나다_오타와.jpg",
                "/nation_imgs/콜롬비아_보고타.png","/nation_imgs/튀르키예_앙카라.jpg", "/nation_imgs/페루_리마.jpg","/nation_imgs/핀란드_헬싱키.jpg",
                "/nation_imgs/헝가리_부다페스트.jpg"
        };

        for(int i=0;i<25;i++){
            CardDto cardDto = new CardDto();
            //cardDto.setCardId(i);
            cardDto.setMainTitle(titles[i]);
            cardDto.setSubTitle(subtitle[i]);
            cardDto.setMainImgUrl(uploadPath + mainImgUrl[i]);
            cardDto.setUserId(1);
            Card cards = cardDto.toEntity();
            cardsRepository.save(cards);
        }

    }

    //2. 기본 덱정보 삽입
    @Test
    @Order(6)
    void setNationDeck(){

        //더미 데이터 저장 및 확인
        Deck deck = Deck.builder()
                .userId(1)
                .deckId(2)
                .cardId(30)
                .deckName("국가 수도 모음집")
                .deckDescription("국가 수도 카드로 게임을 플레이하고, 익혀봅시다")
                .deckUsageCount(1)
                .isPublic(true)
                .build();

        deckRepository.save(deck);

        // select 확인
        DeckDto deckDto = cardDeckService.deckInfo(2);

        System.out.println(deckDto);
        assertEquals("국가 수도 모음집", deckDto.getDeckName());


    }
    // 카드 덱 테이블 더미 데이터 삽입
    @Test
    @Order(7)
    void setNationCardDeck(){

//        cardDeckRepository.deleteAllInBatch();

        long decknum = 2;
        long cardIdnum =26; // 카드 아이디 시작번호
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



    //나라 카드 입력2
    @Test
    @Order(9)
    void setNation2CardsToDB() {

//        cardsRepository.deleteAllInBatch();
        //수도명
        String [] titles = {"암스테르담","카트만두","웰링턴","리가","부쿠레슈티",
                "빌뉴스","파두츠","발레타","스코페","콜롬보",
                "스톡홀름","부에노스아이레스","더블린","바쿠","탈린",
                "빈","몬테비데오","타슈켄트","키이우","예루살렘",
                "트빌리시","도하","프놈펜","비슈케크","파리"};
        // 국가명
        String [] subtitle = {"네덜란드","네팔","뉴질랜드","라트비아","루마니아",
                "리투아니아","리히텐슈타인","몰타","북마케도니아","스리랑카",
                "스웨덴","아르헨티나","아일랜드","아제르바이잔","에스토니아",
                "오스트리아","우루과이","우즈베키스탄","우크라이나","이스라엘",
                "조지아","카타르","캄보디아","키르기스스탄","프랑스"};


// https://i9e202.p.ssafy.io/card_images/people_imgs/1_%EB%8B%A8%EA%B5%B0%EC%99%95%EA%B2%80.png
        //String uploadPath = "http://i9e202.p.ssafy.io/home/ubuntu/ssafish/cardMainImage";
        String uploadPath = "https://i9e202.p.ssafy.io/main_images";

        String [] mainImgUrl = {
                "/nation2_imgs/네덜란드_암스테르담.jpg","/nation2_imgs/네팔_카트만두.jpg","/nation2_imgs/뉴질랜드_웰링턴.jpg","/nation2_imgs/라트비아_리가.jpg","/nation2_imgs/루마니아_부쿠레슈티.jpg",
                "/nation2_imgs/리투아니아_빌뉴스.jpg","/nation2_imgs/리히텐슈타인_파두츠.jpg","/nation2_imgs/몰타_발레타.jpg","/nation2_imgs/북마케도니아_스코페.jpg","/nation2_imgs/스리랑카_콜롬보.jpg",
                "/nation2_imgs/스웨덴_스톡홀름.jpg","/nation2_imgs/아르헨티나_부에노스아이레스.jpg","/nation2_imgs/아일랜드_더블린.jpg","/nation2_imgs/아제르바이잔_바쿠.jpg","/nation2_imgs/에스토니아_탈린.jpg",
                "/nation2_imgs/오스트리아_빈.jpg","/nation2_imgs/우루과이_몬테비데오.jpg","/nation2_imgs/우즈베키스탄_타슈켄트.jpg","/nation2_imgs/우크라이나_키이우.jpg","/nation2_imgs/이스라엘_예루살렘.jpg",
                "/nation2_imgs/조지아_트빌리시.jpg","/nation2_imgs/카타르_도하.jpg","/nation2_imgs/캄보디아_프놈펜.jpg","/nation2_imgs/키르기스스탄_비슈케크.jpg","/nation2_imgs/프랑스_파리.jpg"
        };

        for(int i=0;i<25;i++){
            CardDto cardDto = new CardDto();
            //cardDto.setCardId(i);
            cardDto.setMainTitle(titles[i]);
            cardDto.setSubTitle(subtitle[i]);
            cardDto.setMainImgUrl(uploadPath + mainImgUrl[i]);
            cardDto.setUserId(1);
            Card cards = cardDto.toEntity();
            cardsRepository.save(cards);
        }

    }

    //2. 기본 덱정보 삽입
    @Test
    @Order(10)
    void setNation2Deck(){

        //더미 데이터 저장 및 확인
        Deck deck = Deck.builder()
                .userId(1)
                .deckId(3)
                .cardId(51)
                .deckName("국가 수도 모음집")
                .deckDescription("국가 수도 카드로 게임을 플레이하고, 익혀봅시다")
                .deckUsageCount(1)
                .isPublic(true)
                .build();

        deckRepository.save(deck);

        // select 확인
        DeckDto deckDto = cardDeckService.deckInfo(3);

        System.out.println(deckDto);
        assertEquals("국가 수도 모음집", deckDto.getDeckName());


    }
    // 카드 덱 테이블 더미 데이터 삽입
    @Test
    @Order(11)
    void setNation2CardDeck(){

//        cardDeckRepository.deleteAllInBatch();

        long decknum = 3;
        long cardIdnum =51; // 카드 아이디 시작번호
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




    //명화 카드 입력
    @Test
    @Order(13)
    void setPaintingCardsToDB() {

//        cardsRepository.deleteAllInBatch();
        //수도명
        String [] titles = {"그랑드자트섬의 일요일 오후","기억의 지속","기타 치는 노인","나와 마을","대사들",
                "두 자매","마라의 죽음","밤샘하는 사람들","뱃놀이 일행의 오찬","별이 빛나는 밤",
                "비너스의 탄생","상처 입은 천사","수련 연못","스타","시녀들",
                "아르놀피니 부부의 초상","아메리칸 고딕","아테네 학당"," 안개바다 위의 방랑자","야간 순찰대",
                "이반뇌제와 그의 아들 이반","잠자는 집시","진주 귀걸이를 한 소녀","큰 모자를 쓴 잔 에뷔테른","해돋이"
        };
        // 국가명
        String [] subtitle = {"조르주 쇠라","살바도르 달리","파블로 피카소","마르크 샤갈","한스 홀바인",
                "오귀스트 르누아르","자크루이 다비드","에드워드 호퍼","오귀스트 르누아르","빈센트 반 고흐",
                "산드로 보티첼리","휴고 심베리","클로드 모네","에드가 드가","디에고 벨라스케스",
                "얀 판 에이크","그랜트 우드","라파엘로 산치오","다비드 프리드리히","렘브란트 반 레인",
                "일리야 레핀","앙리 루소","요하네스 페르메이르","아메데오 모딜리아니","클로드 모네"
        };


// https://i9e202.p.ssafy.io/card_images/people_imgs/1_%EB%8B%A8%EA%B5%B0%EC%99%95%EA%B2%80.png
        //String uploadPath = "http://i9e202.p.ssafy.io/home/ubuntu/ssafish/cardMainImage";
        String uploadPath = "https://i9e202.p.ssafy.io/main_images";

        String [] mainImgUrl = {
                "/painting_imgs/그랑드자트섬의 일요일 오후.jpg","/painting_imgs/기억의 지속.png","/painting_imgs/기타 치는 노인.jpg","/painting_imgs/나와 마을.jpg","/painting_imgs/대사들.jpg",
                "/painting_imgs/두 자매.jpg","/painting_imgs/마라의 죽음.jpg","/painting_imgs/밤샘하는 사람들.jpg","/painting_imgs/뱃놀이 일행의 오찬.jpg","/painting_imgs/별이 빛나는 밤.jpg",
                "/painting_imgs/비너스의 탄생.jpg","/painting_imgs/상처 입은 천사.jpg","/painting_imgs/수련 연못.jpg","/painting_imgs/스타.jpg","/painting_imgs/시녀들.jpg",
                "/painting_imgs/아르놀피니 부부의 초상.jpg","/painting_imgs/아메리칸 고딕.jpg","/painting_imgs/아테네 학당.jpg","/painting_imgs/안개바다 위의 방랑자.jpg","/painting_imgs/야간 순찰대.jpg",
                "/painting_imgs/이반뇌제와 그의 아들 이반.jpg","/painting_imgs/잠자는 집시.jpg","/painting_imgs/진주 귀걸이를 한 소녀.jpg","/painting_imgs/큰 모자를 쓴 잔 에뷔테른.jpg","/painting_imgs/해돋이.jpg"
        };

        for(int i=0;i<25;i++){
            CardDto cardDto = new CardDto();
            //cardDto.setCardId(i);
            cardDto.setMainTitle(titles[i]);
            cardDto.setSubTitle(subtitle[i]);
            cardDto.setMainImgUrl(uploadPath + mainImgUrl[i]);
            cardDto.setUserId(1);
            Card cards = cardDto.toEntity();
            cardsRepository.save(cards);
        }

    }

    //2. 기본 덱정보 삽입
    @Test
    @Order(14)
    void setPaintingDeck(){

        //더미 데이터 저장 및 확인
        Deck deck = Deck.builder()
                .userId(1)
                .deckId(4)
                .cardId(80)
                .deckName("명화 모음집")
                .deckDescription("명화 카드로 게임을 플레이하고, 익혀봅시다")
                .deckUsageCount(1)
                .isPublic(true)
                .build();

        deckRepository.save(deck);

        // select 확인
        DeckDto deckDto = cardDeckService.deckInfo(4);

        System.out.println(deckDto);
        assertEquals("명화 모음집", deckDto.getDeckName());


    }
    // 카드 덱 테이블 더미 데이터 삽입
    @Test
    @Order(15)
    void setPaintingCardDeck(){

//        cardDeckRepository.deleteAllInBatch();

        long decknum = 4;
        long cardIdnum =76; // 카드 아이디 시작번호
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



}
