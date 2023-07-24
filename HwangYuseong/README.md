# 23.07.24

## 패키지 구분
- common 패키지: exception 이나 util 등 저장
- config 패키지: 각종 configuration 저장
- domain 패키지: 도메인별(user, deck, card 등)로 entity와 repository를 함께 저장
- service 패키지: 도메인별로 service 저장
- web 패키지: controller, dto, controllerAdvice, handler, filter 저장

## 의존성
dependencies {
//롬북
	implementation 'org.projectlombok:lombok'
	annotationProcessor 'org.projectlombok:lombok'
//롬복 테스트
	testImplementation 'org.projectlombok:lombok'
    testAnnotationProcessor 'org.projectlombok:lombok'
//자동 재시작
	implementation 'org.springframework.boot:spring-boot-devtools' 
//JPA
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	runtimeOnly 'com.mysql:mysql-connector-j'

    implementation 'org.springframework.boot:spring-boot-starter-security'
    testImplementation 'org.springframework.security:spring-security-test'

	implementation 'org.springframework.boot:spring-boot-starter-web'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'

	implementation 'com.h2database:h2'

    implementation 'org.springframework.boot:spring-boot-starter-oauth2-client'
    implementation 'org.springframework.session:spring-session-jdbc'

// 웹 소켓
	implementation 'org.springframework.boot:spring-boot-starter-amqp'
	implementation 'org.springframework.boot:spring-boot-starter-websocket'
	testImplementation 'org.springframework.amqp:spring-rabbit-test'
	implementation 'org.webjars:sockjs-client:1.0.2'
	implementation 'org.webjars:stomp-websocket:2.3.3'
}
