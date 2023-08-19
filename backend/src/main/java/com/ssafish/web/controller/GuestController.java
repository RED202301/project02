package com.ssafish.web.controller;

import com.ssafish.service.UserService;
import com.ssafish.web.dto.Role;
import com.ssafish.web.dto.UserRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
public class GuestController {

    private final UserService userService;

    @PostMapping("/api/v1/guest")
    public ResponseEntity<Object> create(@RequestBody UserRequestDto requestDto) {
        // 닉네임 중복 체크
        String nickname = requestDto.getNickname();
        if (nickname.length() > 10) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Too long nickname.");
        } else {
            if (userService.isAvailable(nickname)) {
                return ResponseEntity.status(HttpStatus.OK).body(userService.create(requestDto));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nickname is already taken.");
            }
        }
    }
}
