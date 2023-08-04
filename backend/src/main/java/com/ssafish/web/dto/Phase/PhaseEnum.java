package com.ssafish.web.dto.Phase;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PhaseEnum {
    PERSON_CHOOSE(0), CARD_CHOOSE(1), REPLY_CHOOSE(2), GAME_START(3), GAME_OVER(4);

    private final int value;
}
