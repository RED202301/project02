package com.ssafish.web;

import com.ssafish.service.MemberService;
import com.ssafish.web.dto.MemberRequestDto;
import com.ssafish.web.dto.MemberResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService userService;

    @PostMapping("/api/v1/user")
    public MemberResponseDto create(@RequestBody MemberRequestDto requestDto) {
        return userService.create(requestDto);
    }
}
