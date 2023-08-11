package com.ssafish.service;

import com.ssafish.domain.card.Card;
import com.ssafish.domain.card.CardsRepository;
import com.ssafish.domain.card.UserCard;
import com.ssafish.domain.card.UserCardRepository;
import com.ssafish.web.dto.CardDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
    public CardDto cardInsert(CardDto inputcardDto, MultipartFile mainImgUrl ,MultipartFile subImgUrl){

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
            log.info("card Main image ready");
            UUID uuid = UUID.randomUUID();
            String extension = StringUtils.getFilenameExtension(filename);
            String saveFileName = uuid + "." + extension;

            log.info("card Main image ready123123");
            log.info("image file path: " + destFile.getPath());

            String path = "/home/ssafish/cardMainImage";
            destFile = new File(path +File.separator+ saveFileName); //// 이부분을 고치니 해결되었다.
            log.info("image file path: " + destFile.getPath());

            //mainImgUrl.transferTo(destFile); //이미지 저장
            log.info("card Main image is saved");
            log.info("image file path: " + destFile.getPath());

            //subImgUrl save
            if(subImgUrl != null){
                File uploadsubDir = new File(uploadSubPath); // 수정
                if (!uploadsubDir.exists()) {
                    uploadsubDir.mkdir();
                    log.info("uploadDir sub 생성") ;
                }

                // 파일정보와 새 이름을 지정한다.
                String subfilename = subImgUrl.getOriginalFilename();
                System.out.println(subfilename);
                UUID uuid2 = UUID.randomUUID();
                String extension2 = StringUtils.getFilenameExtension(subfilename);
                String saveFileName2 = uuid2 + "." + extension2;



                destFile2 = new File(uploadSubPath+ saveFileName2);
                mainImgUrl.transferTo(destFile2); //이미지 저장
                log.info("card Main image is saved");
                log.info("image file path: " + destFile2.getPath());

                inputcardDto.setSubImgUrl("https://i9e202.p.ssafy.io/sub_images/" + saveFileName2);


            }



            log.info(" card DB access success");
            //DB에 저장
            inputcardDto.setMainImgUrl("https://i9e202.p.ssafy.io/main_images/" + saveFileName);
            System.out.println("inputcardDto : "+inputcardDto);

            Card card = inputcardDto.toEntity();
            cardsRepository.save(card);
            System.out.println("card: "+ card);

            UserCard userCard = UserCard.builder()
                    .cardId(inputcardDto.getCardId())
                    .userId(inputcardDto.getUserId())
                    .build();

            userCardRepository.save(userCard);

            inputcardDto.setResult(SUCCESS);

        }catch(Exception e){
            e.printStackTrace();

//            if(destFile.exists()) {
//                destFile.delete();
//            }
//            if(destFile2.exists()) {
//                destFile2.delete();
//            }
            if(cardsRepository.findByCardId(inputcardDto.getCardId()) != null){
                cardsRepository.deleteById(inputcardDto.getCardId());
            }


            inputcardDto.setResult(FAIL);
        }
        return inputcardDto;

    }


    @Transactional
    public int deleteCard(long cardId, long userId,Card card){


        try {
            // 카드 제거
            cardsRepository.deleteById(cardId);
            // 유저_카드 관계제거
            userCardRepository.deleteByIds(cardId, userId);


            //카드 이미지 제거
            String mainImage = card.getMainImgUrl();
            String subImage = card.getSubImgUrl();

            //main 이미지 삭제
            //StringTokenizer st = new StringTokenizer(mainImage,"/");
            String main[] = mainImage.split("/");
            System.out.println(main);

            File destfile = new File(uploadMainPath+main[4]);
            destfile.delete();

            if(subImage != null){
                String sub[] = mainImage.split("/");
                System.out.println(sub);

                destfile = new File(uploadMainPath+sub[4]);
                destfile.delete();
            }


            return SUCCESS;
        }catch(Exception e){
            e.printStackTrace();
            if(cardsRepository.findByCardId(cardId) == null){
                cardsRepository.save(card);
            }
            if(userCardRepository.isRelation(cardId,userId) == 0 ){
                UserCard usercard = UserCard.builder()
                        .cardId(cardId)
                        .userId(userId)
                        .build();
                userCardRepository.save(usercard);
            }

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

