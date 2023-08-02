package com.ssafish.web.dto;


import com.ssafish.domain.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberRequestDto {

    private Long userId;
    private String nickname;

    @Builder
    public MemberRequestDto(Long userId, String nickname) {
        this.userId = userId;
        this.nickname = nickname;
    }

    public Member toEntity() {
        return Member.builder()
                .userId(userId)
                .nickname(nickname)
                .build();
    }
}
