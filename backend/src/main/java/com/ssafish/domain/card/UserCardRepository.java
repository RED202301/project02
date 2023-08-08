package com.ssafish.domain.card;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCardRepository extends JpaRepository<UserCard, Long> {

//    @Query(value = " select c.card_id ,c.user_id,c.main_title , c.sub_title , c.main_img_url, c.sub_img_url , " +
//            "  c.card_description, c.point, c.created_date , c.modified_date" +
//            " from cards c right join (select card_id from card_decks where deck_id = ?) a" +
//            " on c.card_id = a.card_id " ,
//            nativeQuery = true)
//    List<Card> findCardDeckList(long deckId);
//    Card findByCardId(long cardId);


}
