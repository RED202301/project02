package com.ssafish.domain.user;

import com.ssafish.domain.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@ToString
@Getter
@Data
@Table(name = "User")
@NoArgsConstructor
@Entity
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", unique = true, nullable = false)
    private Long userId;

    @Column(name = "username", length=10)
    private String username;

    @Column(name = "nickname", unique = true, length=10)
    private String nickname;

    @Column(name = "kakao_id")
    private Long kakaoId;

    @Column(name = "profile_img_url")
    private String profileImgUrl;

    @Column(name = "thumbnail_img_url")
    private String thumbnailImgUrl;  //오타수정 thumbnailImgUrl

    @Column(name = "is_default_image")
    private boolean isDefaultImage;


    @Column(name = "email")
    private String email;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "kakao_access_token")
    private String kakaoAccessToken;

    @Column(name = "is_login")
    private boolean isLogin;

    @Column(name = "total_point")
    private int totalPoint;

    @Column(name = "play_count")
    private int playCount;

//    @Column(name = "create_date")
//    @Temporal(TemporalType.DATE)
//    private LocalDateTime createdDate; //Date -> LocalDateTime

    @Builder
    public User(long userId, long kakaoId, String nickname, String profileImgUrl,
         String thumbnailImgUrl, String email, String refreshToken, String kakaoAccessToken,
         boolean isDefaultImage, boolean isLogin, int totalPoint , int playCount) {

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
    }

}
