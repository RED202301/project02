package com.ssafish.web.dto;

import com.ssafish.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserRequestDto {

    private Long userId;
    private String nickname;

    @Builder
    public UserRequestDto(Long userId, String nickname) {
        this.userId = userId;
        this.nickname = nickname;
    }

    public User toEntity() {
        return User.builder()
                .userId(userId)
                .nickname(nickname)
                .build();
    }
}
