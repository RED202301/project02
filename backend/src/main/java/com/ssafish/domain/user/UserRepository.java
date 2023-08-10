package com.ssafish.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByKakaoId(Long KakaoId);
    User findByNickname(String nickname);
    void deleteByKakaoId(Long kakaoId);
}
