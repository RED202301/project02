package com.ssafish.service;

import com.ssafish.domain.user.User;
import com.ssafish.domain.user.UserRepository;
import com.ssafish.web.dto.KakaoUserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public static User mapToEntity(KakaoUserInfo kakaoUserInfo, String refreshToken, String kakaoAccessToken) {
        User user = new User();
        user.setKakaoId(kakaoUserInfo.getId());
        user.setNickname(kakaoUserInfo.getNickname());
        user.setRefreshToken(refreshToken);
        user.setKakaoAccessToken(kakaoAccessToken);
        user.setProfileImgUrl(kakaoUserInfo.getProfileImgUrl());
        user.setThumnailImgUrl(kakaoUserInfo.getThumnailImgUrl());
        user.setEmail(kakaoUserInfo.getEmail());
        return user;
    }

    public User findUserByKakaoId(Long kakaoId) {
        return userRepository.findByKakaoId(kakaoId);
    }

    public User updateTokens(User user, String newRefreshToken, String newKakaoAccessToken) {
        user.setRefreshToken(newRefreshToken);
        user.setKakaoAccessToken(newKakaoAccessToken);
        return userRepository.save(user);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
