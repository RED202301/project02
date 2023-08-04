package com.ssafish.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Player {

    private int userId;
    private String nickname;
    private boolean isBot;
    private long score;
    private List<Integer> cardsOnHand;
    private List<Integer> cardsEnrolled;
}
