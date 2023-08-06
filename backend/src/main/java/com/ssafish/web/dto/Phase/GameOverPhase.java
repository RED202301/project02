package com.ssafish.web.dto.Phase;

import com.ssafish.web.dto.GameData;
import com.ssafish.web.dto.GameStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;


@RequiredArgsConstructor
@Component
public class GameOverPhase extends Phase {

    protected final SimpMessageSendingOperations messagingTemplate;

    public void run() {

    }
}
