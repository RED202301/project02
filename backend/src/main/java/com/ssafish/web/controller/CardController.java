package com.ssafish.web.controller;

import com.ssafish.domain.card.Card;
import com.ssafish.domain.card.CardsRepository;
import com.ssafish.domain.card.UserCardRepository;
import com.ssafish.service.CardService;
import com.ssafish.web.dto.CardDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
@Slf4j
public class CardController {

    @Autowired
    CardService cardService;
    @Autowired
    UserCardRepository userCardRepository;
    @Autowired
    CardsRepository cardsRepository;

    @PostMapping("/card")
    public ResponseEntity<?> cardInsret( MultipartHttpServletRequest imgFile ){
        //public ResponseEntity<?> cardInsret(@RequestBody CardDto cardDto, MultipartHttpServletRequest mainImg , @RequestParam("mainImg") MultipartFile subImg){
        //카드 파일저장
        //카드_유저 연결
        //System.out.println(mainImgUrl);

        Long userId = Long.parseLong(imgFile.getParameter("userId"));
        Long cardId = Long.parseLong(imgFile.getParameter("cardId"));
        String mainTitle = imgFile.getParameter("mainTitle");
        String subTitle = imgFile.getParameter("subTitle");
        String cardDescription = imgFile.getParameter("cardDescription");
        int point = Integer.parseInt(imgFile.getParameter("point"));

        CardDto cardDto = CardDto.builder()
                .userId(userId)
                .cardId(cardId)
                .mainTitle(mainTitle)
                .subTitle(subTitle)
                .point(point)
                .cardDescription(cardDescription)
                .build();
        log.info("input card info" + cardDto);

        long maxFileSize = 10 * 1024 * 1024; // 10MB

        MultipartFile mainImg = imgFile.getFile("MainImg");
        MultipartFile subImg = imgFile.getFile("SubImg");

        if (mainImg.getSize() > maxFileSize){
            StringBuilder errorMessage = new StringBuilder("최대 파일 크기 초과");
            return ResponseEntity.badRequest().body(errorMessage.toString());
            //return ResponseEntity.badRequest().build("최대 파일 크기 초과");
        }
        if(subImg != null) {
            if(subImg.getSize() > maxFileSize){
                StringBuilder errorMessage = new StringBuilder("최대 파일 크기 초과");
                return ResponseEntity.badRequest().body(errorMessage.toString());

            }

        }
        if (cardDto.getUserId() ==0){
            StringBuilder errorMessage = new StringBuilder("사용자 정보가 필요합니다.");
            return ResponseEntity.badRequest().body(errorMessage.toString());
        }

        cardDto = cardService.cardInsert(cardDto,mainImg, subImg);

        if(cardDto.getResult() == 1){
            log.info("resopnse card info: " + cardDto);
            return ResponseEntity.ok().body(cardDto); //정상결과 출력
        }else{
            log.info("card save error!!");
            return ResponseEntity.notFound().build();
        }

    }

    @DeleteMapping("/card/{cardId}")
    public ResponseEntity<?> cardDelete(@PathVariable long cardId, long userId){

        // 유저_카드 간의 관계가 있을때 관계만을 삭제한다.
        Card card = cardsRepository.findByCardId(cardId);
        if(userCardRepository.isRelation(cardId,userId) >= 1 || card != null){
            int result = cardService.deleteCard(cardId,userId,card);

            if(result == 1){
                log.info("card delete success");
                return ResponseEntity.ok().build(); //정상결과 출력
            }else{
                log.info("card delete fail!!");
                return ResponseEntity.notFound().build();
            }
        }

        StringBuilder errorMessage = new StringBuilder("존재하지 않는 카드 입니다.");
        return ResponseEntity.badRequest().body(errorMessage.toString());


    }

//    }
    @GetMapping("/card/{userId}")
    public ResponseEntity<List<CardDto>> userCardList(@PathVariable long userId){

        List<CardDto> userCardList = cardService.userCardList(userId);

        return ResponseEntity.ok().body(userCardList);
    }




}
