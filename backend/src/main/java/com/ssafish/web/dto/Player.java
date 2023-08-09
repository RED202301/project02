package com.ssafish.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class Player {

    private long userId;
    private String nickname;
    private boolean isBot;
    private int score;
    private List<Long> cardsOnHand;
    private List<Long> cardsEnrolled;

    @Builder
    public Player(long userId, String nickname, boolean isBot) {
        this.userId = userId;
        this.nickname = nickname;
        this.isBot = isBot;
        this.score = 0;
        this.cardsOnHand = new ArrayList<>();
        this.cardsEnrolled = new ArrayList<>();
    }

    public void addScore(int scoreAdd) {
        this.score += scoreAdd;
    }
}
