package com.ssafish.domain.user;

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
    private Long id;
    private Long kakaoId;
    private String nickname;
    private String kakaoAccessToken;
    private String refreshToken;
    private String profileImgUrl;
    private String thumnailImgUrl;
    private String email;
}
