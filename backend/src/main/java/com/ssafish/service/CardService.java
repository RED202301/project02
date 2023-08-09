package com.ssafish.service;

import com.ssafish.domain.card.Card;
import com.ssafish.domain.card.CardsRepository;
import com.ssafish.domain.card.UserCard;
import com.ssafish.domain.card.UserCardRepository;
import com.ssafish.web.dto.CardDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class CardService {

//    @Value("${app.fileupload.uploadPath}")
//    String uploadPath;
//
//    @Value("${app.fileupload.uploadFolder}")
//    String uploadFolder;

    @Autowired
    CardsRepository cardsRepository;

    @Autowired
    UserCardRepository userCardRepository;

    //해당 덱의 정보 읽어오기
//    public DeckDto deckInfo(long deckId){
//
//        return deckRepository.findById(deckId).orElse(null).toDto();
//
//    }

    // 카드 정보 저장하기

    private static final int SUCCESS = 1;
    private static final int FAIL = 0;


    //해당덱의 모든 카드 정보 읽어오기 ! 수정중
    public List<CardDto> deckCardList(long deckId){
    //List<Card_decks>를 반환하도록한다.// 해당덱의 카드리스트를 넘겨준다.

        List<Card> d = cardsRepository.findCardDeckList(deckId);

        List<CardDto> cardList = new ArrayList<>();
        d.forEach((card) -> cardList.add(card.toDto()));
        return cardList;
    }

    @Transactional
    public CardDto cardInsert(CardDto inputcardDto, MultipartFile imagefile){

        CardDto cardDto = new CardDto();
        File destFile = new File("dummy");
        File destFile2 = new File("dummy");

        try {
            System.out.println("ser1 "+imagefile);
            //uploadPath 주소 spring 내부 파일로 볼륨동기화해서 저장하고 읽어오기[수정 필요]
            ///home/ubuntu/ssafish/cardMainImage
            String uploadPath = File.separator + "home" + File.separator+"ubuntu"+ File.separator+
                    "ssafish"+ File.separator+"cardMainImage"; //
            //String uploadPath = "https://i9e202.p.ssafy.io/card_images/cardMainImage"; //
            //String uploadFolder = "cardMainImage";

            //이미지 전체가 저장될 경로
            //File uploadDir = new File(uploadPath); // 수정
            //if (!uploadDir.exists()) uploadDir.mkdir();

            String filename = imagefile.getOriginalFilename();
            System.out.println(filename);
            UUID uuid = UUID.randomUUID();
            String extension = StringUtils.getFilenameExtension(filename);

            String saveFileName = uuid + "." + extension; // 저장될 실제 경로
            //하지만 다시내려 줄때는 nginx에 설정된 형태로 내려 줘야한다.


            destFile = new File(uploadPath + File.separator + saveFileName);
            //System.out.println("here error! :" + destFile);
            log.info("here error! :" + destFile);
            imagefile.transferTo(destFile); //이미지 저장

            log.info("new test" );
            System.out.println("new test");
            

           //System.out.println("!!!123");
            log.info("here" );
            destFile2 = new File("/home/ubuntu/ssafish/cardMainImage");
            imagefile.transferTo(destFile2); //이미지 저장
            log.info("destFile2: " + destFile2);
            System.out.println("!!!");
            //내려줄 주소 형식
            //https://i9e202.p.ssafy.io/card_images/people_imgs/1_%EB%8B%A8%EA%B5%B0%EC%99%95%EA%B2%80.png
            String downloadPath = "https://i9e202.p.ssafy.io/card_images/cardMainImage/";

            //DB에 저장
            inputcardDto.setMainImgUrl(downloadPath + saveFileName);
            Card card = inputcardDto.toEntity();
            cardsRepository.save(card);

            UserCard userCard = UserCard.builder()
                    .userId(inputcardDto.getUserId())
                    .build();
            userCardRepository.save(userCard);

            cardDto.setResult(SUCCESS);

        }catch(Exception e){

            if(destFile.exists()) {
                destFile.delete();
            }
            cardDto.setResult(FAIL);
        }
        return cardDto;

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
