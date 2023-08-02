package com.ssafish.service;

import com.ssafish.domain.MemberRepository;
import com.ssafish.web.dto.MemberRequestDto;
import com.ssafish.web.dto.MemberResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository userRepository;

    @Transactional
    public MemberResponseDto create(MemberRequestDto requestDto) {
        return MemberResponseDto.from(userRepository.save(requestDto.toEntity()));
    }
}
