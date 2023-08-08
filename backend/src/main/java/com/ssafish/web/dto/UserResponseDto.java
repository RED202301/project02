package com.ssafish.web.dto;

import com.ssafish.domain.user.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder(access = AccessLevel.PRIVATE)
public class UserResponseDto {

    private Long userId;
    private String nickname;
    public static UserResponseDto from(User user) {
        return UserResponseDto.builder()
                .userId(user.getUserId())
                .nickname(user.getNickname())
                .build();
    }
}
