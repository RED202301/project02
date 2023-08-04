package com.ssafish.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class Player {

    private int userId;
    private String nickname;
    private boolean isBot;
    private int score;
    private List<Integer> cardsOnHand;
    private List<Integer> cardsEnrolled;

    @Builder
    public Player(int userId, String nickname, boolean isBot, int score) {
        this.userId = userId;
        this.nickname = nickname;
        this.isBot = isBot;
        this.score = score;
        this.cardsOnHand = new ArrayList<>();
        this.cardsEnrolled = new ArrayList<>();
    }
}
