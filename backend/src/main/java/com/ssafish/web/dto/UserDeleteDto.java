package com.ssafish.web.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDeleteDto {
    private boolean wantToDeleteDeck;
}
