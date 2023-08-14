package com.ssafish;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;
import java.util.TimeZone;


@SpringBootApplication
public class SsafishApplication {

    public static void main(String[] args) {
        SpringApplication.run(SsafishApplication.class, args);
    }

    @PostConstruct
    public void started(){ // 서버에서 로그의 현재 시간을 정확히 표시
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));

    }

}
