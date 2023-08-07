package com.ssafish.web.dto;

import lombok.Data;

@Data
public class TokensResponse {
    private String accessToken;
    private String refreshToken;
    private long userId;
    private String nickname;

    public TokensResponse(String accessToken, String refreshToken, long userId) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.userId = userId;
    }
}
