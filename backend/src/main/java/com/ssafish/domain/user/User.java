package com.ssafish.domain.user;

import java.util.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name = "User")
@NoArgsConstructor

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", unique = true, nullable = false)
    private Long userId;

    @Column(name = "nickname", length=10)
    private String nickname;

    @Column(name = "kakao_id")
    private Long kakaoId;

    @Column(name = "profile_img_url")
    private String profileImgUrl;

    @Column(name = "thumnail_img_url")
    private String thumnailImgUrl;

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

    @Column(name = "create_date")
    @Temporal(TemporalType.DATE)
    private Date createdDate;

}
