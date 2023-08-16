package com.ssafish.web.dto;

import com.ssafish.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class UserRequestDto {

    private String nickname;
    @Setter
    private String role;

    @Builder
    public UserRequestDto(String nickname, String role) {
        this.nickname = nickname;
        this.role = role;
    }

    public User toEntity() {
        return User.builder()
                .nickname(nickname)
                .role(Role.GUEST.name())
                .build();
    }
}
