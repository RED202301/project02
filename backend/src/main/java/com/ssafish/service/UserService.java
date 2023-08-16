package com.ssafish.service;

import com.ssafish.domain.user.User;
import com.ssafish.domain.user.UserRepository;
import com.ssafish.web.dto.KakaoUserInfo;
import com.ssafish.web.dto.UserRequestDto;
import com.ssafish.web.dto.UserResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
@Slf4j
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

    @Transactional
    public long deleteUser(long kakaoId) {
        // kakao 연결 해제
        String reqURL = "https://kapi.kakao.com/v1/user/unlink";
        String kakaoAccessToken = userRepository.findByKakaoId(kakaoId).getKakaoAccessToken();
        long userId = userRepository.findByKakaoId(kakaoId).getUserId();

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + kakaoAccessToken);

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            log.info("deleteUser responseCode : " + responseCode);

            // DB에서 삭제
            userRepository.deleteByKakaoId(kakaoId);
            return userId;
        } catch (IOException e) {
            e.printStackTrace();
            return -1;
        }
    }

    public void changeNickname(Long userId, String newNickname) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null.");
        }

        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("해당하는 유저가 없습니다."));
        if (user == null) {
            throw new IllegalArgumentException("User not found with ID: " + userId);
        }

        user.setNickname(newNickname);
        userRepository.save(user);
    }

    public boolean isAvailable(String nickname) {
        return (userRepository.findByNickname(nickname) == null && nickname.length() > 0);
    }

    @Transactional
    public UserResponseDto create(UserRequestDto requestDto) {
        return UserResponseDto.from(userRepository.save(requestDto.toEntity()));
    }
}
