package com.ssafish.web.dto;

import lombok.*;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MsgRequest {
    int roomId;
    String content;
}
