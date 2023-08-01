package com.ssafish.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.security.Principal;

@Getter
@AllArgsConstructor
public class StompPrincipal implements Principal {
    String name;
}
