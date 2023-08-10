package com.ssafish.web.dto.Phase;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;


public abstract class Phase {

    protected void awaitSecond(long second) {
        ScheduledExecutorService timer = Executors.newSingleThreadScheduledExecutor();
        CountDownLatch latch = new CountDownLatch(1);
        timer.schedule(latch::countDown, second, TimeUnit.SECONDS);
        try {
            latch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
