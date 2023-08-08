package com.ssafish.web;

import com.ssafish.service.CardDeckService;
import com.ssafish.service.GameService;
import com.ssafish.service.RoomService;
import com.ssafish.web.dto.Board;
import com.ssafish.web.dto.CardDto;
import com.ssafish.web.dto.GameData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Slf4j
@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
public class GameController {

    private final CardDeckService cardDeckService;
    private final RoomService roomService;
    private final GameService gameService;

    @Async
    @MessageMapping("/{roomId}/start-game")
    public void startGame(@DestinationVariable int roomId, @Payload GameData gameData,
                          @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

        Board board = gameService.getGameRoomByRoomId(roomId);
        long deckId = board.getDeckId();
        List<CardDto> cardList = cardDeckService.deckCardList(deckId);
        Collections.shuffle(cardList);

        // 인원 수에 따라 카드 수와 별점 조절

        if (board.getGameStatus().getPlayerList().size() < 4) {
            cardList = cardList.subList(0, 15);
        }
        int cardSize = cardList.size();
        for (int idx = 0; idx < cardSize; idx++) {
            if (idx * 5 < cardSize) {
                cardList.get(idx).setPoint(3);
            } else if (idx * 5 < cardSize * 3) {
                cardList.get(idx).setPoint(2);
            } else {
                cardList.get(idx).setPoint(1);
            }
        }
        gameData.setCards(cardList);

        gameService.startGame(roomId, gameData);
    }

    @Async
    @MessageMapping("/{roomId}/select-player")
    public void selectPlayer(@DestinationVariable int roomId, @Payload GameData gameData,
                             @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

        gameService.selectPlayer(roomId, gameData);
    }

    @Async
    @MessageMapping("/{roomId}/test-player")
    public void testPlayer(@DestinationVariable int roomId, @Payload GameData gameData,
                           @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

        gameService.testPlayer(roomId, gameData);
    }

    @Async
    @MessageMapping("/{roomId}/select-card")
    public void selectCard(@DestinationVariable int roomId, @Payload GameData gameData,
                           @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

        gameService.selectCard(roomId, gameData);
    }

    @Async
    @MessageMapping("/{roomId}/reply")
    public void reply(@DestinationVariable int roomId, @Payload GameData gameData,
                      @Headers Map<String, Object> attributes, SimpMessageHeaderAccessor headerAccessor) throws Exception {

        gameService.reply(roomId, gameData);
    }
}
