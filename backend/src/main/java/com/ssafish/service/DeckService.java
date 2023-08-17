package com.ssafish.service;

import com.ssafish.domain.card.CardsRepository;
import com.ssafish.domain.deck.CardDeck;
import com.ssafish.domain.deck.CardDeckRepository;
import com.ssafish.domain.deck.Deck;
import com.ssafish.domain.deck.DeckRepository;
import com.ssafish.domain.user.User;
import com.ssafish.domain.user.UserRepository;
import com.ssafish.web.dto.DeckDto;
import com.ssafish.web.dto.DeckRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class DeckService {

    private final DeckRepository deckRepository;
    private final CardDeckRepository cardDeckRepository;
    private final CardsRepository cardsRepository;
    private final UserRepository userRepository;

    public DeckRequestDto create(DeckRequestDto deckRequestDto) {
        // [1] DB에 deck 저장
        DeckDto deckDto = deckRequestDto.getDeck();

        // 덱 생성한 사람 id 없거나 덱 이름 및 설명이 없는 경우
        if (deckDto.getUserId() <= 0 || deckDto.getDeckDescription() == null || deckDto.getDeckName() == null) {
            throw new IllegalArgumentException("Invalid deck condition");
        }

        // 대표 카드가 카드리스트 안에 없는 경우
        if (deckDto.getCardId() <= 0 || !deckRequestDto.getCardIdList().contains(deckDto.getCardId())) {
            throw  new IllegalArgumentException("Main card is not in cardIdList");
        }

        // cardIdList 길이가 25가 아닌 경우
        List<Long> cardIdList = deckRequestDto.getCardIdList();
        if (cardIdList.size() != 25) {
            throw new IllegalArgumentException("cardIdList should have 25 card IDs");
        }

        Deck deck = Deck.builder()
                .user(userRepository.findById(deckDto.getUserId()).orElseThrow(() -> new IllegalArgumentException("해당하는 유저가 없습니다.")))
                .card(cardsRepository.findByCardId(deckDto.getCardId()))
                .deckName(deckDto.getDeckName())
                .deckDescription(deckDto.getDeckDescription())
                .deckUsageCount(0)
                .isPublic(true)
                .build();

        Deck createdDeck = deckRepository.save(deck);

        // [2] DB에 card_deck 저장
        long deckId = createdDeck.getDeckId();

        cardIdList.forEach(e -> {
            CardDeck cardDeck = CardDeck.builder()
                    .card(cardsRepository.findByCardId(e))
                    .deck(createdDeck)
                    .build();
            cardDeckRepository.save(cardDeck);
        });

        deckRequestDto.setDeck(createdDeck.toDto());
        return deckRequestDto;
    }


    @Transactional
    public void delete(long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("해당하는 유저가 없습니다."));
        deckRepository.deleteAllByUser(user);
    }

    // 덱 이름으로 덱을 찾는다.
    public Deck findDeckName(String deckName){

        Deck deck = deckRepository.findDeckName(deckName);
        return deck;

    }
}
