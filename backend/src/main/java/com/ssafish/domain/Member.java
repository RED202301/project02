package com.ssafish.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", unique = true, nullable = false)
    private Long userId;

    @Column(name = "user_nickname", length = 20, unique = true, nullable = false)
    private String nickname;

    @Builder
    Member(Long userId, String nickname) {
        this.userId = userId;
        this.nickname = nickname;
    }
}
