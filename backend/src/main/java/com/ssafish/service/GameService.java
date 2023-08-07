package com.ssafish.service;

import com.ssafish.web.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@RequiredArgsConstructor
@Service
public class GameService {

    private final ObjectFactory<Board> boardFactory;
    private final ObjectFactory<GameStatus> gameStatusFactory;
    private final Map<Long, Board> boards = new ConcurrentHashMap<>();

    public void createGameRoom(RoomResponseDto responseDto) {
        log.info("createGameRoom invoke");
        Board board = boardFactory.getObject();

        GameStatus gameStatus = gameStatusFactory.getObject();
        gameStatus.setRoomId(responseDto.getRoomId());
        gameStatus.setTurnTimeLimit(responseDto.getTimeLimit());

        board.setGameStatus(gameStatus);
        board.setDeckId(responseDto.getDeckId());
        board.setTimeLimit(responseDto.getTimeLimit());
        board.setCapacity(responseDto.getCapacity());

        boards.put(responseDto.getRoomId(), board);
        log.info(boards.get(responseDto.getRoomId()).toString());
    }

    public Board getGameRoomByRoomId(long roomId) {
        return boards.get(roomId);
    }

    public void addPlayer(long roomId, long userId, String nickname, boolean isBot) {
        boards.get(roomId).addPlayer(userId, nickname, isBot);
    }

    public void removePlayer(long roomId, long userId) {
        boards.get(roomId).removePlayer(userId);
    }

    public List<Player> getPlayerList(long roomId) {
        return boards.get(roomId).getGameStatus().getPlayerList();
    }

    public void startGame(long roomId, GameData gameData) {
        boards.keySet().forEach(System.out::println);
        boards.get(roomId).play(gameData);
    }

    public void selectPlayer(long roomId, GameData gameData) {
        boards.get(roomId).handlePub(gameData);
    }

    public void testPlayer(long roomId, GameData gameData) {
        boards.get(roomId).handlePub(gameData);
    }

    public void selectCard(long roomId, GameData gameData) {
        boards.get(roomId).handlePub(gameData);
    }

    public void reply(long roomId, GameData gameData) {
        boards.get(roomId).handlePub(gameData);
    }
}
