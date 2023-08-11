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
        gameStatus.setCheatSheet(new ConcurrentHashMap<>());

        board.setGameStatus(gameStatus);
        board.setUserId(responseDto.getUserId());
        board.setDeckId(responseDto.getDeckId());
        board.setTimeLimit(responseDto.getTimeLimit());
        board.setCapacity(responseDto.getCapacity());

        boards.put(responseDto.getRoomId(), board);
        log.info("생성된 방 번호: " + boards.get(responseDto.getRoomId()));
    }

    public void changeGameRoom(RoomResponseDto responseDto) {
        Board board = boards.get(responseDto.getRoomId());
        log.info("변경 이전 방 정보: " + board);

        if (board != null) {
            GameStatus gameStatus = board.getGameStatus();
            gameStatus.setTurnTimeLimit(responseDto.getTimeLimit());

            board.setDeckId(responseDto.getDeckId());
            board.setCapacity(responseDto.getCapacity());
            board.setTimeLimit(responseDto.getTimeLimit());

            log.info("변경 이후 방 정보: " + board);
        } else {
            log.warn("변경할 방이 없습니다. roomId: " + responseDto.getRoomId());
            throw new IllegalArgumentException("room not found.");
        }
    }

    public void deleteGameRoom(long roomId) {
        boards.remove(roomId);
        log.info("삭제된 방 번호: " + roomId);
    }

    public Board getGameRoomByRoomId(long roomId) {
        return boards.get(roomId);
    }

    public void addPlayer(long roomId, long userId, String nickname, boolean isBot) {
        Board board = boards.get(roomId);
        boolean already = false;
        List<Player> playerList = board.getGameStatus().getPlayerList();
        if (playerList.size() < board.getCapacity() && !board.isStarted()) {
            // 인원수를 넘지 않고 아직 시작하지 않았으며
            for (Player player : playerList) {
                if (userId == player.getUserId()) {
                    already = true;
                    break; // 이미 찾았으므로 더 이상 반복할 필요가 없음
                }
            }
            // 유저가 그 방에 없으면 플레이어 입장 (추가 필요)
            if (!already) {
                board.addPlayer(userId, nickname, isBot);
            } else {
                throw new IllegalStateException("User already exists in the room."); // 예외 던지기
            }
        } else {
            throw new IllegalStateException("Cannot add player to the room."); // 예외 던지기
        }
    }

    public void removePlayer(long roomId, long userId) {
        boards.get(roomId).removePlayer(userId);
    }

    public List<Player> getPlayerList(long roomId) {
        return boards.get(roomId).getGameStatus().getPlayerList();
    }

    public void startGame(long roomId, GameData gameData) {
        Board board = boards.get(roomId);
        log.info("play 메서드 호출 이전인 방 번호: " + roomId);
        board.play(gameData);
        log.info("play 메서드 호출 완료한 방 번호: " + roomId);
    }

    public void selectPlayer(long roomId, GameData gameData) {
        boards.get(roomId).handlePub(gameData);
    }

    public void selectCard(long roomId, GameData gameData) {
        boards.get(roomId).handlePub(gameData);
    }

    public void reply(long roomId, GameData gameData) {
        boards.get(roomId).handlePub(gameData);
    }

    public List<Player> ready(long roomId, GameData gameData) {
        long userId = gameData.getPlayer();
        List<Player> playerList = boards.get(roomId).getGameStatus().getPlayerList();
        Player player = playerList.stream().filter(e -> e.getUserId() == userId).findAny().orElseThrow();
        player.changeReady();

        return playerList;
    }
}
