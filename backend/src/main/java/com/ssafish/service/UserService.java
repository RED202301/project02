package com.ssafish.service;

import com.ssafish.domain.user.User;
import com.ssafish.domain.user.UserRepository;
import com.ssafish.web.dto.KakaoUserInfo;
import com.ssafish.web.dto.UserRequestDto;
import com.ssafish.web.dto.UserResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        user.setUsername(kakaoUserInfo.getNickname());
        user.setRefreshToken(refreshToken);
        user.setKakaoAccessToken(kakaoAccessToken);
        user.setProfileImgUrl(kakaoUserInfo.getProfileImgUrl());
        user.setThumbnailImgUrl(kakaoUserInfo.getThumnailImgUrl());
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

    public void changeNickname(Long userId, String newNickname) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null.");
        }

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new IllegalArgumentException("User not found with ID: " + userId);
        }

        user.setNickname(newNickname);
        userRepository.save(user);
    }

    public boolean isAvailable(String nickname) {
        return userRepository.findByNickname(nickname) == null;
    }

    @Transactional
    public UserResponseDto create(UserRequestDto requestDto) {
        return UserResponseDto.from(userRepository.save(requestDto.toEntity()));
    }
}
