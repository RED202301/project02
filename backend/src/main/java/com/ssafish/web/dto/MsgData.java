package com.ssafish.web.dto;

import lombok.*;

@Data
public class MsgData {
    private String type;
    String sender;
    String content;

    @Builder
    public MsgData(String type, String sender, String content) {
        this.type = type;
        this.sender = sender;
        this.content = content;
    }
}
