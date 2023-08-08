package com.ssafish.web.dto;

import com.ssafish.domain.user.User;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
public class UserDto {

    private long userId;
    private long kakaoId;
    private String nickname;
    private String profileImgUrl;
    private String thumbnailImgUrl;
    private String email;
    private String refreshToken;
    private String kakaoAccessToken;
    private boolean isDefaultImage;
    private boolean isLogin;
    private int totalPoint;
    private int playCount;
    private LocalDateTime createdDate;

    private int result;


    @Builder
    public UserDto
            (long userId,long kakaoId, String nickname, String profileImgUrl,
             String thumbnailImgUrl, String email, String refreshToken,String kakaoAccessToken,
             boolean isDefaultImage,boolean isLogin, int totalPoint , int playCount,LocalDateTime createdDate){
        this.userId = userId;
        this.kakaoId = kakaoId;
        this.nickname = nickname;
        this.profileImgUrl = profileImgUrl;
        this.thumbnailImgUrl = thumbnailImgUrl;
        this.email = email;
        this.refreshToken = refreshToken;
        this.kakaoAccessToken = kakaoAccessToken;
        this.isDefaultImage = isDefaultImage;
        this.isLogin = isLogin;
        this.totalPoint = totalPoint;
        this.playCount = playCount;
        this.createdDate = createdDate;

    }

    public User toEntity() {
        return User.builder()
                .userId(userId)
                .kakaoId(kakaoId)
                .nickname(nickname)
                .profileImgUrl(profileImgUrl)
                .thumbnailImgUrl(thumbnailImgUrl)
                .email(email)
                .refreshToken(refreshToken)
                .kakaoAccessToken(kakaoAccessToken)
                .isDefaultImage(isDefaultImage)
                .isLogin(isLogin)
                .totalPoint(totalPoint)
                .playCount(playCount)
                .build();
    }

}
