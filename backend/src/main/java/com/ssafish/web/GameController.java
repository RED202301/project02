package com.ssafish.web;

import com.ssafish.service.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
public class GameController {

    private final GameService gameService;


}
