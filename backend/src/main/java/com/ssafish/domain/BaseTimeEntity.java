package com.ssafish.domain;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseTimeEntity {

    @CreatedDate
    @Column(name = "created_date")
    private LocalDateTime createDate; //DateTime ?뭔가 수정필요

    @LastModifiedDate
    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

//    public void setDatetoLocalDateTime(Date createDate) {
//        this.createDate = LocalDateTime.ofInstant(createDate.toInstant(), ZoneId.systemDefault());
//    }// 타입 확인필요

}
