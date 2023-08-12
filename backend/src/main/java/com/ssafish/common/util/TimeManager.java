package com.ssafish.common.util;

import org.springframework.stereotype.Component;

import java.time.LocalTime;

@Component
public class TimeManager {

    public String getCurrentTime() {
        LocalTime curTime = LocalTime.now();
        String prefix;
        int hour;
        if (curTime.isAfter(LocalTime.NOON)) {
            prefix = "오후";
            hour = curTime.minusHours(12).getHour();
        } else {
            prefix = "오전";
            hour = curTime.getHour();
        }
        int minute = curTime.getMinute();
        int second = curTime.getSecond();

        return String.format("[%s %d시 %d분 %d초] ", prefix, hour, minute, second);
    }
}
