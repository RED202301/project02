package com.ssafish.service;

import com.ssafish.domain.UserRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserRoomService {

    private final UserRoomRepository userRoomRepository;


}
