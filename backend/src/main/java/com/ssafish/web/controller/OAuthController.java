package com.ssafish.web.controller;

import com.ssafish.domain.user.User;
import com.ssafish.service.OAuthService;
import com.ssafish.service.UserService;
import com.ssafish.service.provider.JwtProvider;
import com.ssafish.web.dto.ChangeNicknameDto;
import com.ssafish.web.dto.KakaoUserInfo;
import com.ssafish.web.dto.TokensResponse;
import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@RequestMapping("/oauth")
@CrossOrigin("*") // zzzzzzzzzzzzㅠㅠ
@Slf4j
public class OAuthController {

    @Autowired
    private OAuthService oauthservice;

    @Autowired
    private UserService userService;

    private final String secretKey;

    public OAuthController(@Value("${jwt.secret}") String secretKey) {
        this.secretKey = secretKey;
    }

    @ResponseBody
    @RequestMapping("/login")
    public ResponseEntity<TokensResponse> kakaoCallback(@RequestParam String code) {
        HashMap<String, String> tokens = oauthservice.getAccessToken(code);
        String access_token = tokens.get("access_token");
        KakaoUserInfo kakaoUserInfo = oauthservice.getKakaoUserInfo(access_token);

        String jwtAccessToken = JwtProvider.createAccessToken(kakaoUserInfo.getId(), secretKey);
        String jwtRefreshToken = JwtProvider.createRefreshToken(kakaoUserInfo.getId(), secretKey);
        User kakaoUser = userService.findUserByKakaoId(kakaoUserInfo.getId());


        log.info("kakao access_token : " + access_token);
        log.info("login Controller : " + kakaoUserInfo);
        log.info("jwtAccessToken : " + jwtAccessToken);
        log.info("jwtRefreshToken : " + jwtRefreshToken);


        if (kakaoUser != null) {
            // kakao_access_token 변경 로직
            User user = userService.updateTokens(kakaoUser, jwtRefreshToken, access_token);
            TokensResponse response = new TokensResponse(jwtAccessToken, jwtRefreshToken, user.getUserId());
            response.setNickname(user.getNickname());
            log.info("user : " + user);
            log.info("로그인 성공");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            User user = userService.mapToEntity(kakaoUserInfo, jwtRefreshToken, access_token);
            userService.saveUser(user);
            TokensResponse response = new TokensResponse(jwtAccessToken, jwtRefreshToken, user.getUserId());
            response.setNickname(user.getNickname());
            log.info("user : " + user);
            log.info("회원가입 및 로그인 성공");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<Object> refreshAccessToken(HttpServletRequest request) {
        try {
            String authorizationHeader = request.getHeader("Authorization");
            String refreshToken = "";

            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                refreshToken = authorizationHeader.substring(7);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
            }

            // 리프레시 토큰 유효성 검사
            if (JwtProvider.isRefreshToken(refreshToken, secretKey)) {
                // 리프레시 토큰이 유효하다면, 유저 정보를 가져오거나 해당 토큰에 연결된 유저 정보를 데이터베이스에서 조회

                // 유저 정보를 바탕으로 새로운 액세스 토큰 발급
                Long userId = JwtProvider.getUserId(refreshToken, secretKey);
                String newAccessToken = JwtProvider.createAccessToken(userId, secretKey);

                // 새로운 액세스 토큰을 클라이언트에게 전달
                return ResponseEntity.status(HttpStatus.OK).body(new TokensResponse(newAccessToken, refreshToken, userService.findUserByKakaoId(userId).getUserId()));
            } else {
                // 리프레시 토큰이 유효하지 않을 경우, 클라이언트에게 인증 실패 응답 전달
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
            }
        } catch (JwtException e) {
            // 토큰 파싱이 실패하거나 유효하지 않은 토큰일 경우, 클라이언트에게 인증 실패 응답 전달
            log.error("refresh failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }
    }

    @ResponseBody
    @PutMapping("/change-nickname")
    public ResponseEntity<String> changeUserNickname(@RequestBody ChangeNicknameDto request) {
        try {
            // 닉네임 중복 체크
            if (userService.isAvailable(request.getNickname())) {
                userService.changeNickname(request.getUserId(), request.getNickname());
                return ResponseEntity.status(HttpStatus.OK).body("Nickname changed successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nickname is already taken.");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }


    @GetMapping("/userinfo")
    public String getUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        return "User: " + username;
    }



    @RequestMapping(value="/logout")
    public ResponseEntity<Object> logout(HttpServletRequest request) {
        log.info("로그아웃 요청");
        String authorizationHeader = request.getHeader("Authorization");
        String accessToken = "";

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            accessToken = authorizationHeader.substring(7);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid access token");
        }

        Long userId = JwtProvider.getUserId(accessToken, secretKey);

        log.info("accessToken: " + accessToken);
        log.info("userId: " + userId);
        oauthservice.kakaoLogout(userId);

        return ResponseEntity.status(HttpStatus.OK).body("Logout success");
    }
}
