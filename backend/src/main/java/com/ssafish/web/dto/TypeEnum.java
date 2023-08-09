package com.ssafish.web.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TypeEnum {
    GAME_START(0), AUTO_DRAW(1), ENROLL(2), SELECT_PLAYER_TURN(3), SELECT_PLAYER(4),
    SELECT_CARD_TURN(5), SELECT_CARD(6), REPLY_TURN(7), REPLY(8), CARD_MOVE(9),
    GAME_OVER(10), WINNER_CEREMONY(11), TEST_PLAYER(12), ROOM_LEADER(13), ENTER(14),
    EXIT(15);

    private final int value;
}