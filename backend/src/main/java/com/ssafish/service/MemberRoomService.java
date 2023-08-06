package com.ssafish.service;

import com.ssafish.domain.MemberRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberRoomService {

    private final MemberRoomRepository memberRoomRepository;


}
