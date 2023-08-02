package com.ssafish.web.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class KakaoUserInfo {

    private Long id;
    private String nickname;
    private String profileImgUrl;
    private String thumnailImgUrl;
    private String email;
}
