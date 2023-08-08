package com.ssafish.web.dto.Phase;

import com.ssafish.service.RoomService;
import com.ssafish.web.dto.GameData;
import com.ssafish.web.dto.GameStatus;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Scope;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;


public abstract class Phase {
    protected CountDownLatch latch;

    protected void awaitSecond(long second) {
        ScheduledExecutorService timer = Executors.newSingleThreadScheduledExecutor();
        latch = new CountDownLatch(1);
        timer.schedule(latch::countDown, second, TimeUnit.SECONDS);
        try {
            latch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
