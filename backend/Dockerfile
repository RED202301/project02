FROM openjdk:11-jre
EXPOSE 5001
ENV TZ=Asia/Seoul
COPY build/libs/ssafish-0.0.1-SNAPSHOT.jar /ssafish.jar
WORKDIR /
ENTRYPOINT ["java", "-jar", "/ssafish.jar"]