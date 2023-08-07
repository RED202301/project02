package com.ssafish.web.dto;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Data
@RequiredArgsConstructor
public class ChangeNicknameDto {
    private Long userId;
    private String nickname;
}
