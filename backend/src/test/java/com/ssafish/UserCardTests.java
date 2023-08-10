package com.ssafish;

import com.ssafish.domain.card.UserCard;
import com.ssafish.domain.card.UserCardRepository;
import com.ssafish.service.CardService;
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
class UserCardTests {


    @Autowired
    UserCardRepository userCardRepository;

    @Autowired
    CardService cardService;

    // 1. dummy insert
    @Test
    @Order(1)
    void insertUserCard(){

        UserCard userCard = UserCard.builder()
                .cardId(123123)
                .userId(321321)
                .build();
        userCardRepository.save(userCard);

    }

    @Test
    @Order(2)
    void deleteUserCard(){

        long cardId = 123123;
        long userId = 321321;
        int result = 0;


        if(userCardRepository.isRelation(cardId,userId) >= 1){
            userCardRepository.deleteByIds(cardId,userId);

            result =1;
        }


        assertEquals(1,result);
        //assertIterableEquals(expected,list);

    }

    // 서비스단 테스트
//    @Test
//    @Order(3)
//    void deleteUserCardService(){
//        Card card;
//        cardService.deleteCard(123123,321321,card);
//    }



}
