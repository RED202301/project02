package com.ssafish.web.dto.Phase;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PhaseEnum {
    GAME_START(0), PERSON_CHOOSE(1), CARD_CHOOSE(2), REPLY_CHOOSE(3), GAME_OVER(4);

    private final int value;
}
