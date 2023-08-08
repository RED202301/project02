package com.ssafish.web.controller;

import com.ssafish.service.CardService;
import com.ssafish.web.dto.CardDto;
import com.ssafish.web.dto.UserDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/card")
@CrossOrigin("*")
@Slf4j
public class CardController {

    @Autowired
    CardService cardService;


    @PostMapping()
    public ResponseEntity<CardDto> cardInsret(CardDto cardDto, MultipartFile request){

        //카드 파일저장
        //카드_유저 연결
        System.out.println(request);
        log.info("input card info" + cardDto);



        cardDto = cardService.cardInsert(cardDto, request);
        log.info("resopnse card info" + cardDto);

        if(cardDto.getResult() == 1){

            return ResponseEntity.ok().body(cardDto); //정상결과 출력
        }else{

            return ResponseEntity.notFound().build();
        }

    }


}
