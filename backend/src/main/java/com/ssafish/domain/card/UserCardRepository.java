package com.ssafish.domain.card;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface UserCardRepository extends JpaRepository<UserCard, Long> {
    @Transactional
    @Modifying
    @Query(value = " delete from user_cards where user_id = ?2 and card_id = ?1 " ,
            nativeQuery = true)
    void deleteByIds(long cardId, long userId);

    @Query(value = " select count(*) from user_cards where user_id = ?2 and card_id = ?1 ",
            nativeQuery = true)
    int isRelation(@Param("cardId")long cardId,@Param("userId") long userId);
//    Card findByCardId(long cardId);


}
