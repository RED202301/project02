package com.ssafish.web.dto;

import lombok.*;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomRequest {
    String name;
    int timeLimit;
    int capacity;
    String gameType;
}
