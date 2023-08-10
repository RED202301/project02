package com.ssafish.web.dto;


import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SocketData {

    private String type;
    private long userId;
    private String nickname;
    private boolean isBot;
    private long numPlayer;
    private List<Player> playerList;

    @Builder
    public SocketData(String type, long userId, String nickname, boolean isBot, long numPlayer, List<Player> playerList) {
        this.type = type;
        this.userId = userId;
        this.nickname = nickname;
        this.isBot = isBot;
        this.numPlayer = numPlayer;
        this.playerList = playerList;
    }
}
