FROM openjdk:11-jre
EXPOSE 8080
EXPOSE 5001
ADD build/libs/ssafish-0.0.1-SNAPSHOT.jar ssafish.jar
ENTRYPOINT ["java", "-jar", "ssafish.jar"]