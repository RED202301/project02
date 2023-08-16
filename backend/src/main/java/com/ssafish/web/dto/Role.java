package com.ssafish.web.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    MEMBER("member"), GUEST("guest");

    private final String value;
}
