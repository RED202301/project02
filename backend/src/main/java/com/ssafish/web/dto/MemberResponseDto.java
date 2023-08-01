package com.ssafish.web.dto;

import com.ssafish.domain.Member;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder(access = AccessLevel.PRIVATE)
public class MemberResponseDto {

    private Integer userId;
    private String nickname;
    public static MemberResponseDto from(Member user) {
        return MemberResponseDto.builder()
                .userId(user.getUserId())
                .nickname(user.getNickname())
                .build();
    }
}
