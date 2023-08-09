package com.ssafish.web.controller;

import com.ssafish.domain.card.UserCardRepository;
import com.ssafish.service.CardService;
import com.ssafish.web.dto.CardDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
@Slf4j
public class CardController {

    @Autowired
    CardService cardService;
    @Autowired
    UserCardRepository userCardRepository;

    @PostMapping("/card")
    public ResponseEntity<?> cardInsret(CardDto cardDto, MultipartFile mainImgUrl , MultipartFile subImgUrl){

        //카드 파일저장
        //카드_유저 연결
        System.out.println(mainImgUrl);
        log.info("input card info" + cardDto);

        long maxFileSize = 10 * 1024 * 1024; // 10MB

        if (mainImgUrl.getSize() > maxFileSize || subImgUrl.getSize() > maxFileSize ) {
            StringBuilder errorMessage = new StringBuilder("최대 파일 크기 초과");
            return ResponseEntity.badRequest().body(errorMessage.toString());
            //return ResponseEntity.badRequest().build("최대 파일 크기 초과");
        }
        if (cardDto.getUserId() == 0){
            StringBuilder errorMessage = new StringBuilder("사용자 정보가 필요합니다.");
            return ResponseEntity.badRequest().body(errorMessage.toString());
        }


        cardDto = cardService.cardImageInsert(cardDto, mainImgUrl,subImgUrl);


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

        if(userCardRepository.isRelation(cardId,userId) >= 1){


            int result = cardService.deleteCard(cardId,userId);


            if(result == 1){
                log.info("card delete success");
                return ResponseEntity.ok().build(); //정상결과 출력
            }else{
                log.info("card delete fail!!");
                return ResponseEntity.notFound().build();
            }
        }

        StringBuilder errorMessage = new StringBuilder("이미 삭제된 카드 입니다.");
        return ResponseEntity.badRequest().body(errorMessage.toString());


    }



}
