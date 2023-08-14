// import Card from './components/Cards/Card/Card';

// --------------
import { useEffect, useRef, useState } from 'react';

import useOpenVidu from './hooks/useOpenVidu/useOpenVidu';
import {
  useStomp,
  connect,
  disconnect,
  startGame,
  testPlayer,
  selectPlayer,
  selectCard,
  reply,
} from './hooks/useStomp/useStomp';

import UI from './components/UI/UI';
import FirstPersonView from './components/FirstPersonView/FirstPersonView';

import styles from './GameRoom.module.scss';
import { Player } from './Class/Player';

/** @typedef {import('./typedef')} */

export default function GameRoom() {
  const roomId = sessionStorage.getItem('roomId');
  const userId = Number(sessionStorage.getItem('userId'));
  const nickname = sessionStorage.getItem('nickname');
  const pinNumber = sessionStorage.getItem('pinNumber');

  /** @type {[playerMap, setState<playerMap>]} */ const [playerMap, setPlayerMap] = useState({});
  // /** @type {[cardMap, setState<cardMap>]} */ const [cardMap, setCardMap] = useState({});
  /** @type {React.MutableRefObject<cardMap>} */
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

  const [view, setView] = useState(0);
  const [viewAngles, setViewAngles] = useState(0);
  const [players, setPlayers] = useState([]);

  /** @type {Map<phase, Function>} */
  const callbacks = {
    ENTER: (/** @type {{userId:number, nickname:String, bot:boolean}[]}*/ playerList) => {
      const me = Number(sessionStorage.getItem('userId'));
      setPlayerMap(() => {
        const newPlayerMap = {};
        while (playerList[0].userId !== me) {
          const [player, ...players] = playerList;
          playerList = [...players, player];
        }
        const players = [];
        playerList.forEach(({ userId, nickname, bot }) => {
          newPlayerMap[userId] = new Player({ userId, nickname, bot });
          players.push(newPlayerMap[userId]);
        });
        setPlayers(players);
        return newPlayerMap;
      });

      setViewAngles(() => {
        const angleUnit = [0, 0, 0, 60, 45, 72];
        switch (playerList.length) {
          case 3:
          case 4:
          case 5:
            setView(1);
            return [-angleUnit[playerList.length], 0, +angleUnit[playerList.length]];
          default:
            setView(0);
            return [0];
        }
      });
    },
    EXIT: (/** @type {{userId:number, nickname:String, bot:boolean}[]}*/ playerList) => {
      if (currentPhase === 'WAITING') {
        setPlayerMap(() => {
          const newPlayerMap = {};
          playerList.forEach(({ userId, nickname, bot }) => {
            newPlayerMap[userId] = new Player({ userId, nickname, bot });
          });
          return newPlayerMap;
        });
      }

      setViewAngles(() => {
        const viewAngleUnit = 360 / playerList.length;
        const idx = playerList.findIndex(
          player => player.userId === sessionStorage.getItem('userId')
        );
        const angleUnit = [0, 0, 0, 60, 45, 72];
        switch (playerList.length) {
          case 3:
          case 4:
          case 5:
            return [
              viewAngleUnit * idx - angleUnit[playerList.length],
              viewAngleUnit * idx,
              viewAngleUnit * idx + angleUnit[playerList.length],
            ];
          default:
            setView(0);
            return [viewAngleUnit * idx];
        }
      });
    },
    WAITING: () => {},
    START_GAME: (/** @type {phase}*/ phase, /** @type {cardMap} */ cardMap) => {
      setCurrentPhase(prev => {
        console.log(prev, '=>', phase);
        return phase;
      });
      // setCardMap(cardMap);
      cardMapRef.current = cardMap;
      // console.log(cardMap);
      alert('제한 시간이 끝나면, 자동으로 플레이 됩니다. (현재 자동 플레이만 가능)');
    },
    AUTO_DRAW: (/** @type {phase}*/ phase, userId, cardId) => {
      setCurrentPhase(prev => {
        console.log(prev, '=>', phase);
        return phase;
      });
      setPlayerMap(playerMap => {
        const newPlayerMap = { ...playerMap };
        newPlayerMap[userId].draw(cardMapRef.current[cardId]);
        // console.log(cardMapRef.current, cardId, cardMapRef.current[cardId]);
        return newPlayerMap;
      });
    },
    ENROLL: (/** @type {phase}*/ phase, userId, cardId) => {
      setCurrentPhase(prev => {
        console.log(prev, '=>', phase);
        return phase;
      });
      setPlayerMap(playerMap => {
        const newPlayerMap = { ...playerMap };
        newPlayerMap[userId].enroll(cardId);
        return newPlayerMap;
      });
    },
    SELECT_PLAYER_TURN: (/** @type {phase}*/ phase, player) => {
      setCurrentPhase(prev => {
        console.log(prev, '=>', phase);
        return phase;
      });
      setCurrentPlayer(prev => {
        console.log(prev);
        console.log(player);
        return player;
      });

      setSelectedPlayer(null);
      setSelectedCard(null);
    },
    TEST_PLAYER: player => {
      setSelectedPlayer(player);
    },
    SELECT_PLAYER: (/** @type {phase}*/ phase, requester, responser) => {
      setCurrentPhase(prev => {
        console.log(prev, '=>', phase);
        return phase;
      });
      setCurrentPlayer(requester);
      setSelectedPlayer(responser);
    },
    SELECT_CARD_TURN: (/** @type {phase}*/ phase, player) => {
      setCurrentPhase(prev => {
        console.log(prev, '=>', phase);
        return phase;
      });
      setCurrentPlayer(player);
    },
    SELECT_CARD: (/** @type {phase}*/ phase, player, cardId) => {
      setCurrentPhase(prev => {
        console.log(prev, '=>', phase);
        return phase;
      });
      setCurrentPlayer(player);
      setSelectedCard(cardId);
    },
    REPLY_TURN: (/** @type {phase}*/ phase, player, cardId) => {
      setCurrentPhase(prev => {
        console.log(prev, '=>', phase);
        return phase;
      });
      setSelectedPlayer(player);
      setSelectedCard(cardId);
    },
    REPLY: (/** @type {phase}*/ phase, requester, responser, isGoFish) => {
      setCurrentPhase(prev => {
        console.log(prev, '=>', phase);
        return phase;
      });
      setCurrentPlayer(requester);
      setSelectedPlayer(responser);
      setIsGoFish(isGoFish);
    },
    CARD_MOVE: (/** @type {phase}*/ phase, from, to) => {
      setCurrentPhase(prev => {
        console.log(prev, '=>', phase);
        return phase;
      });
      setSelectedPlayer(from);
      setCurrentPlayer(to);
      setPlayerMap(playerMap => {
        const newPlayerMap = { ...playerMap };
        setSelectedCard(selectedCard => {
          newPlayerMap[from].lost(selectedCard);
          newPlayerMap[to].draw(cardMapRef.current[selectedCard]);
          return selectedCard;
        });
        return newPlayerMap;
      });
    },
    END_GAME: (/** @type {phase}*/ phase) => {
      setCurrentPhase(prev => {
        console.log(prev, '=>', phase);
        return phase;
      });
    },
    WINNER_CEREMONY: (/** @type {phase}*/ phase, winner) => {
      setCurrentPhase(prev => {
        console.log(prev, '=>', phase);
        return phase;
      });
      winner;
    },
  };

  const stompClient = useStomp();
  const { subscriberMap, session, publisher, openViduInitializer } = useOpenVidu({
    sessionId: roomId,
    userId,
    nickname,
  });

  function testPlayerWapper(opponent) {
    return testPlayer({ stompClient, roomId, player: opponent });
  }

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
    <div
      className={`${styles.GameRoom}`}
      style={{
        '--view-angle': `${viewAngles[view]}deg`,
      }}
    >
      {subscriberMap ? (
        <FirstPersonView
          {...{
            playerMap,
            userId,
            subscriberMap,
            currentPlayer,
            selectedPlayer,
            currentPhase,
            setSelectedPlayer,
            testPlayerWapper,
            publisher,
            players,
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
            selectedCard: selectedCard ? cardMapRef.current[selectedCard] : null,
            currentPhase,
            isGoFish,
            publisher,
            viewAngles,
            setView,
            view,
            setSelectedCard,
            setCurrentPhase,
          }}
          player={playerMap[userId]}
        ></UI>
      ) : (
        <></>
      )}
      <div style={{ position: 'absolute' }}>
        {currentPhase === 'WAITING' ? (
          <button
            onClick={() => {
              startGame({ stompClient, roomId });
            }}
          >
            게임시작
          </button>
        ) : (
          <></>
        )}
        {currentPhase === 'SELECT_PLAYER_TURN' && userId === currentPlayer ? (
          <button
            onClick={() =>
              selectPlayer({
                stompClient,
                roomId,
                requester: currentPlayer,
                responser: selectedPlayer,
              })
            }
          >
            플레이어 선택
          </button>
        ) : (
          <></>
        )}
        {currentPhase === 'SELECT_CARD_TURN' && userId === currentPlayer ? (
          <button
            onClick={() => selectCard({ stompClient, roomId, currentPlayer, cardId: selectedCard })}
          >
            카드 선택
          </button>
        ) : (
          <></>
        )}
        {currentPhase === 'REPLY_TURN' && userId === selectedPlayer ? (
          <button
            onClick={() => {
              const goFish =
                playerMap[selectedPlayer].cardsOnHand.findIndex(
                  card => card.cardId === selectedCard
                ) === -1;
              reply({
                stompClient,
                roomId,
                requester: currentPlayer,
                responser: selectedPlayer,
                goFish,
              });
            }}
          >
            고피쉬
          </button>
        ) : (
          <></>
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          boxShadow:
            currentPlayer === userId
              ? `inset 0 0 10vw yellowgreen`
              : selectedPlayer === userId
              ? `inset 0 0 10vw skyblue`
              : ``,
        }}
      />
    </div>
  );
}
