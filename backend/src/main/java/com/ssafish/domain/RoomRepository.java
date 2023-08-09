package com.ssafish.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {

    Room findByPinNumber(String pinNumber);
    Room findByRoomId(long roomId);
}
