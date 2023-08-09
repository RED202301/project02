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
import org.springframework.beans.factory.annotation.Value;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class CardService {

    @Value("${app.fileupload.uploadMainPath}")
    String uploadMainPath;

    @Value("${app.fileupload.uploadSubPath}")
    String uploadSubPath;

    @Value("${app.fileupload.downloadMainPath}")
    String downloadMainPath;

    @Value("${app.fileupload.downloadSubPath}")
    String downloadSubPath;

    @Autowired
    CardsRepository cardsRepository;

    @Autowired
    UserCardRepository userCardRepository;


    private static final int SUCCESS = 1;
    private static final int FAIL = 0;



    public List<CardDto> deckCardList(long deckId){


        List<Card> d = cardsRepository.findCardDeckList(deckId);

        List<CardDto> cardList = new ArrayList<>();
        d.forEach((card) -> cardList.add(card.toDto()));
        return cardList;
    }

    @Transactional
    public CardDto cardImageInsert(CardDto inputcardDto, MultipartFile mainImgUrl ,MultipartFile subImgUrl){

        CardDto cardDto = new CardDto();
        File destFile = new File("dummy");
        File destFile2 = new File("dummy2");

        try {

            //이미지 전체가 저장될 경로
            File uploadDir = new File(uploadMainPath); // 수정
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
                log.info("uploadDir 생성") ;
            }

            // 파일정보와 새 이름을 지정한다.
            String filename = mainImgUrl.getOriginalFilename();
            System.out.println(filename);
            UUID uuid = UUID.randomUUID();
            String extension = StringUtils.getFilenameExtension(filename);
            String saveFileName = uuid + "." + extension;



            destFile = new File(uploadSubPath+ saveFileName);
            mainImgUrl.transferTo(destFile); //이미지 저장
            log.info("card Main image is saved");
            log.info("image file path: " + destFile.getPath());

            //subImgUrl save
            if(subImgUrl != null){
                File uploadsubDir = new File(uploadSubPath); // 수정
                if (!uploadsubDir.exists()) {
                    uploadsubDir.mkdir();
                    log.info("uploadDir 생성") ;
                }

                // 파일정보와 새 이름을 지정한다.
                String subfilename = subImgUrl.getOriginalFilename();
                System.out.println(subfilename);
                UUID uuid2 = UUID.randomUUID();
                String extension2 = StringUtils.getFilenameExtension(subfilename);
                String saveFileName2 = uuid2 + "." + extension2;



                destFile2 = new File(downloadSubPath+ saveFileName2);
                mainImgUrl.transferTo(destFile2); //이미지 저장
                log.info("card Main image is saved");
                log.info("image file path: " + destFile2.getPath());


            }



            log.info(" card DB access success");
            //DB에 저장
            inputcardDto.setMainImgUrl(downloadMainPath + saveFileName);
            Card card = inputcardDto.toEntity();
            cardsRepository.save(card);

            UserCard userCard = UserCard.builder()
                    .cardId(inputcardDto.getCardId())
                    .userId(inputcardDto.getUserId())
                    .build();
            userCardRepository.save(userCard);

            inputcardDto.setResult(SUCCESS);

        }catch(Exception e){
            e.printStackTrace();

            if(destFile.exists()) {
                destFile.delete();
            }
            if(destFile2.exists()) {
                destFile2.delete();
            }
            if(cardsRepository.findByCardId(inputcardDto.getCardId()) != null){
                cardsRepository.deleteById(inputcardDto.getCardId());
            }


            inputcardDto.setResult(FAIL);
        }
        return cardDto;

    }

    public int deleteCard(long cardId, long userId){
        try {
            userCardRepository.deleteByIds(cardId, userId);
            return SUCCESS;
        }catch(Exception e){
            e.printStackTrace();
            return FAIL;
        }
    }

    public List<CardDto> userCardList(long userId){
    //사용자의 모든 카드정보를 받아온다.
        List<Card> userCardList = cardsRepository.UserCardList(userId);
        List<CardDto> userCardDtoList = new ArrayList<>();
        userCardList.forEach((card) -> userCardDtoList.add(card.toDto()));
        return userCardDtoList;


    }
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

