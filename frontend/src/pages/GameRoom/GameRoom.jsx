// import Card from './components/Cards/Card/Card';

// --------------
import { useEffect, useRef, useState } from 'react';

import useOpenVidu from './hooks/useOpenVidu/useOpenVidu';
import { useStomp, connect, disconnect, startGame } from './hooks/useStomp/useStomp';

import UI from './components/UI/UI';
import FirstPersonView from './components/FirstPersonView/FirstPersonView';

import styles from './GameRoom.module.scss';
import { Player } from './Class/Player';

/** @typedef {import('./typedef')} */

export default function GameRoom() {
  const roomId = sessionStorage.getItem('roomId');
  const userId = sessionStorage.getItem('userId');
  const nickname = sessionStorage.getItem('nickname');
  const pinNumber = sessionStorage.getItem('pinNumber');

  // /**@type {playerMap} */const playerMap = 1;
  // const cardMapRef = useRef()
  // const currentPlayer = 1;
  // const selectedPlayer = 1;
  // const selectedCard = 1;
  // const currentPhase = 1;
  // const isGofish = false;

  /** @type {[playerMap, setState<playerMap>]} */ const [playerMap, setPlayerMap] = useState({});
  // /** @type {[cardMap, setState<cardMap>]} */ const [cardMap, setCardMap] = useState({});
  const cardMapRef = useRef();
  /** @type {[number?, setState<number?>]} */ const [currentPlayer, setCurrentPlayer] =
    useState(null);
  /** @type {[number?, setState<number?>]} */ const [selectedPlayer, setSelectedPlayer] =
    useState(null);
  /** @type {[number?, setState<number?>]} */ const [selectedCard, setSelectedCard] =
    useState(null);
  /** @type {[phase, setState<phase>]} */ const [currentPhase, setCurrentPhase] =
    useState('WAITING');
  /** @type {[boolean?, setState<boolean>]} */ const [isGoFish, setIsGoFish] = useState(null);

  /** @type {Map<phase, Function>} */
  const callbacks = {
    ENTER: (/** @type {{userId:number, nickname:String, bot:boolean}[]}*/ playerList) => {
      const newPlayerMap = {};
      playerList.forEach(({ userId, nickname, bot }) => {
        newPlayerMap[userId] = new Player({ userId, nickname, bot });
      });
      // console.log('-------------', newPlayerMap);
      setPlayerMap(() => newPlayerMap);
    },
    WAITING: () => {},
    START_GAME: (/** @type {phase}*/ phase, /** @type {cardMap} */ cardMap) => {
      setCurrentPhase(phase);
      // setCardMap(cardMap);
      cardMapRef.current = cardMap;
      // console.log(cardMap);
      alert('제한 시간이 끝나면, 자동으로 플레이 됩니다. (현재 자동 플레이만 가능)');
    },
    AUTO_DRAW: (/** @type {phase}*/ phase, userId, cardId) => {
      setCurrentPhase(phase);
      setPlayerMap(playerMap => {
        const newPlayerMap = { ...playerMap };
        newPlayerMap[userId].draw(cardMapRef.current[cardId]);
        // console.log(cardMapRef.current, cardId, cardMapRef.current[cardId]);
        return newPlayerMap;
      });
    },
    ENROLL: (/** @type {phase}*/ phase, userId, cardId) => {
      setCurrentPhase(phase);
      setPlayerMap(playerMap => {
        const newPlayerMap = { ...playerMap };
        newPlayerMap[userId].enroll(cardId);
        return newPlayerMap;
      });
    },
    SELECT_PLAYER_TURN: (/** @type {phase}*/ phase, player) => {
      setCurrentPhase(phase);
      setCurrentPlayer(player);

      setSelectedPlayer(null);
      setSelectedCard(null);
    },
    TEST_PLAYER: player => {
      setSelectedPlayer(player);
    },
    SELECT_PLAYER: (/** @type {phase}*/ phase, requester, responser) => {
      setCurrentPhase(phase);
      setCurrentPlayer(requester);
      setSelectedPlayer(responser);
    },
    SELECT_CARD_TURN: (/** @type {phase}*/ phase, player) => {
      setCurrentPhase(phase);
      setCurrentPlayer(player);
    },
    SELECT_CARD: (/** @type {phase}*/ phase, player, cardId) => {
      setCurrentPhase(phase);
      setCurrentPlayer(player);
      setSelectedCard(cardId);
    },
    REPLY_TURN: (/** @type {phase}*/ phase, player, cardId) => {
      setCurrentPhase(phase);
      setSelectedPlayer(player);
      setSelectedCard(cardId);
    },
    REPLY: (/** @type {phase}*/ phase, requester, responser, isGoFish) => {
      setCurrentPhase(phase);
      setCurrentPlayer(requester);
      setSelectedPlayer(responser);
      setIsGoFish(isGoFish);
    },
    MOVE_CARD: (/** @type {phase}*/ phase, from, to) => {
      setCurrentPhase(phase);
      setCurrentPlayer(from);
      setSelectedPlayer(to);
      setPlayerMap(playerMap => {
        const newPlayerMap = { ...playerMap };
        newPlayerMap[from].lost(selectedCard);
        newPlayerMap[to].draw(selectedCard);
        return newPlayerMap;
      });
    },
    END_GAME: (/** @type {phase}*/ phase) => {
      setCurrentPhase(phase);
    },
    WINNER_CEREMONY: (/** @type {phase}*/ phase, winner) => {
      setCurrentPhase(phase);
      winner;
    },
  };

  const stompClient = useStomp();
  const { subscriberMap, session, publisher, openViduInitializer } = useOpenVidu({
    sessionId: roomId,
    userId,
  });

  function handleBeforeunload() {
    session.disconnect();
    disconnect(stompClient);
  }

  useEffect(() => {
    // console.log('userEffect 실행');
    openViduInitializer();
    connect({ stompClient, roomId, userId, nickname, callbacks });
    window.addEventListener('beforeunload', handleBeforeunload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
    };
  }, []);

  return (
    <div className={`${styles.GameRoom}`}>
      {subscriberMap ? (
        <FirstPersonView
          {...{
            playerMap,
            userId,
            subscriberMap,
            currentPlayer,
            selectedPlayer,
            currentPhase,
          }}
        />
      ) : (
        <></>
      )}
      {publisher ? (
        <UI
          {...{
            pinNumber,
            currentPlayer,
            selectedPlayer,
            selectedCard: selectedCard ? cardMapRef.current[selectedCard] : <></>,
            currentPhase,
            isGoFish,
            publisher,
          }}
          player={playerMap[userId]}
        >
          <button
            style={{ position: 'absolute' }}
            onClick={() => {
              startGame({ stompClient, roomId });
            }}
          >
            게임시작
          </button>
        </UI>
      ) : (
        <></>
      )}
    </div>
  );
}
