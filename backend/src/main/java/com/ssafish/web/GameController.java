package com.ssafish.web;

import com.ssafish.service.CardDeckService;
import com.ssafish.service.GameService;
import com.ssafish.service.RoomService;
import com.ssafish.web.dto.CardDto;
import com.ssafish.web.dto.GameData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

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

        long deckId = gameService.getGameRoomByRoomId(roomId).getDeckId();
        List<CardDto> cardList = cardDeckService.deckCardList(deckId);
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
