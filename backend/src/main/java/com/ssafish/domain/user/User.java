package com.ssafish.domain.user;

import com.ssafish.domain.BaseTimeEntity;
import com.ssafish.domain.card.Card;
import com.ssafish.domain.deck.CardDeck;
import com.ssafish.domain.deck.Deck;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Data
@Table(name = "User")
@NoArgsConstructor
@Entity
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
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

    @Column(name = "role")
    private String role;

//    @Column(name = "create_date")
//    @Temporal(TemporalType.DATE)
//    private LocalDateTime createdDate; //Date -> LocalDateTime

    @OneToMany(mappedBy = "user")
    private List<Card> cards = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Deck> decks = new ArrayList<>();

    @Builder
    public User(long userId, long kakaoId, String nickname, String profileImgUrl,
         String thumbnailImgUrl, String email, String refreshToken, String kakaoAccessToken,
         boolean isDefaultImage, boolean isLogin, int totalPoint , int playCount, String role) {

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
        this.role = role;
    }

}
