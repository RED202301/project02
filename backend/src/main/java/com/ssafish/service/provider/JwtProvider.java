package com.ssafish.service.provider;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;

import java.time.Duration;
import java.util.Date;

@Slf4j
public class JwtProvider {

    private static final Long accessTokenValidTime = Duration.ofHours(12).toMillis();
    private static final Long refreshTokenValidTime = Duration.ofDays(30).toMillis();

    // 회원 정보 조회
    public static Long getUserId(String token, String secretKey) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("userId", Long.class);
    }

    // 토큰 유효 및 만료 확인
    public static boolean isExpired(String token, String secretKey) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            Date expirationDate = claims.getExpiration();
            return expirationDate.before(new Date()); // 현재 시간과 비교하여 만료 여부 확인
        } catch (JwtException | IllegalArgumentException e) {
            // 토큰 파싱이 실패하거나 유효하지 않은 토큰일 경우에도 처리할 수 있음
            return true; // 만료된 것으로 간주
        }
    }

    // refresh 토큰 확인
    public static boolean isRefreshToken(String token, String secretKey) {
        Header header = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getHeader();

        if (header.get("type").toString().equals("refresh")) {
            return true;
        }
        return false;
    }

    // access 토큰 확인
    public static boolean isAccessToken(String token, String secretKey) {
        Header header = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getHeader();

        if (header.get("type").toString().equals("access")) {
            return true;
        }
        return false;
    }

    // access 토큰 생성
    public static String createAccessToken(Long userId, String secretKey) {
        return createJwt(userId, secretKey, "access", accessTokenValidTime);
    }

    // refresh 토큰 생성
    public static String createRefreshToken(Long userId, String secretKey) {
        return createJwt(userId, secretKey, "refresh", refreshTokenValidTime);
    }

    // JWT 생성
    public static String createJwt(Long userId, String secretKey, String type, Long tokenValidTime) {
        Claims claims = Jwts.claims();
        claims.put("userId", userId);

        return Jwts.builder()
                .setHeaderParam("type", type)
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + tokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact()
                ;
    }
}
