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
        gameStatus.setPointMap(new ConcurrentHashMap<>());

        board.setGameStatus(gameStatus);
        board.setDeckId(responseDto.getDeckId());
        board.setTimeLimit(responseDto.getTimeLimit());
        board.setCapacity(responseDto.getCapacity());

        boards.put(responseDto.getRoomId(), board);
        log.info("생성된 방 정보: " + boards.get(responseDto.getRoomId()).toString());
    }

    public Board getGameRoomByRoomId(long roomId) {
        return boards.get(roomId);
    }

    public void addPlayer(long roomId, long userId, String nickname, boolean isBot) {
        Board board = boards.get(roomId);
        boolean already = false;
        if (board.getGameStatus().getPlayerList().size() < board.getCapacity() && !board.isStarted()) {
            // 인원수를 넘지 않고 아직 시작하지 않았으며
            for (Player player : board.getGameStatus().getPlayerList()) {
                if (userId == player.getUserId()) {
                    already = true;
                    break; // 이미 찾았으므로 더 이상 반복할 필요가 없음
                }
            }
            // 유저가 그 방에 없으면 플레이어 입장 (추가 필요)
            if (!already) {
                board.addPlayer(userId, nickname, isBot);
            }
        }
        // 에러 던지기
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
