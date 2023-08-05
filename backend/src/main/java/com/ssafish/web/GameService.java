package com.ssafish.web;

import com.ssafish.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@Service
public class GameService {

    private final ObjectFactory<Board> boardFactory;
    private final ObjectFactory<GameStatus> gameStatusFactory;
    private final Map<Long, Board> boards = new ConcurrentHashMap<>();

    public void createGameRoom(RoomResponseDto responseDto) {
        Board board = boardFactory.getObject();

        GameStatus gameStatus = gameStatusFactory.getObject();
        gameStatus.setRoomId(responseDto.getRoomId());
        gameStatus.setTurnTimeLimit(responseDto.getTimeLimit());

        board.setGameStatus(gameStatus);
        board.setDeckId(responseDto.getDeckId());
        board.setTimeLimit(responseDto.getTimeLimit());
        board.setCapacity(responseDto.getCapacity());

        boards.put(responseDto.getRoomId(), board);
    }

    public Board getGameRoomByRoomId(long userId) {
        return boards.get(userId);
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

    public void startGame(int roomId, GameData gameData) {
        boards.get(roomId).play(gameData);
    }

    public void selectPlayer(int roomId, GameData gameData) {
        boards.get(roomId).handlePub(gameData);
    }

    public void testPlayer(int roomId, GameData gameData) {
        boards.get(roomId).handlePub(gameData);
    }

    public void selectCard(int roomId, GameData gameData) {
        boards.get(roomId).handlePub(gameData);
    }

    public void reply(int roomId, GameData gameData) {
        boards.get(roomId).handlePub(gameData);
    }
}
