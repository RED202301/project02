package com.ssafish.web.dto;

import com.ssafish.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserRequestDto {

    private String nickname;

    @Builder
    public UserRequestDto(String nickname) {
        this.nickname = nickname;
    }

    public User toEntity() {
        return User.builder()
                .nickname(nickname)
                .build();
    }
}
