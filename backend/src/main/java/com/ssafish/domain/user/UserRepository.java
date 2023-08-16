package com.ssafish.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findById(Long userId);
    User findByKakaoId(Long KakaoId);
    User findByNickname(String nickname);
    void deleteByKakaoId(Long kakaoId);
}
