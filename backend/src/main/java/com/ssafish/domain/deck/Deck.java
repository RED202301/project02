package com.ssafish.domain.deck;

import com.ssafish.domain.BaseTimeEntity;
import com.ssafish.web.dto.DeckDto;
import lombok.*;

import javax.persistence.*;

@ToString
@Getter
@Builder
//@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Decks")
@Entity
public class Deck extends BaseTimeEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deck_id", unique = true, nullable = false)
    private long deckId;

    //@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private long userId;

    //@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id", unique = true, nullable = false)
    private long cardId;

    @Column(name = "deck_name", length = 10)
    private String deckName;

    @Column(name = "deck_desciption", length = 500)
    private String deckDescription;

    @Column(name = "deck_usage_count")
    private int deckUsageCount;

    @Column(name = "is_public")
    private boolean isPublic;

    @Builder
    public Deck(long deckId, long userId, long cardId,
                String deckName, String deckDescription,
                int deckUsageCount, boolean isPublic){

       this.deckId = deckId;
       this.userId = userId;
       this.cardId = cardId;
       this.deckName = deckName;
       this.deckDescription = deckDescription;
       this.deckUsageCount = deckUsageCount;
       this.isPublic = isPublic;
    }
    public DeckDto toDto(){
        return DeckDto.builder()
                .deckId(deckId)
                .userId(userId)
                .cardId(cardId)
                .deckName(deckName)
                .deckDescription(deckDescription)
                .deckUsageCount(deckUsageCount)
                .ispublic(isPublic)
                .build();
    }


}
