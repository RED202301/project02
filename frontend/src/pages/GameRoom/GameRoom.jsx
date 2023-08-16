import { useEffect, useRef, useState } from 'react';
import Card from './components/Cards/Card/Card';
import initOpenVidu from './hooks/useOpenVidu/initOpenVidu';
import {
  getStomp,
  connect,
  disconnect,
  startGame,
  testPlayer,
  selectPlayer,
  selectCard,
  reply,
} from './hooks/useStomp/useStomp';
import Notice from './components/Notice/Notice';
import CardToggler from './components/Buttons/ToggleButtons/CardToggler';

import PubCam from './components/MediaPipe/PubCam';
import HandToggler from './components/Buttons/ToggleButtons/HandToggler';
import RotateButton from './components/Buttons/RotateButton/RotateButton';

import styles from './GameRoom.module.scss';
import { Player } from './Class/Player';
import HoverButton from './components/Buttons/HoverButton/HoverButton';
import PubTogglers from './components/PubTogglers/PubTogglers';

import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

import SubCam from './components/MediaPipe/SubCam';

/** @typedef {import('./typedef')} */

export default function GameRoom() {
  const roomId = sessionStorage.getItem('roomId');
  const userId = Number(sessionStorage.getItem('userId'));
  const me = Number(sessionStorage.getItem('userId'));
  const nickname = sessionStorage.getItem('nickname');
  const pinNumber = sessionStorage.getItem('pinNumber');

  // const [players, setPlayers] = useState([]);
  const [playerMap, setPlayerMap] = useState({});
  const cardMapRef = useRef();

  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentPhase, setCurrentPhase] = useState('WAITING');

  const [webcamRunning, setWebcamRunning] = useState(true);

  const [hand, setHand] = useState(true);
  const [card, setCard] = useState(true);

  const [view, setView] = useState(1);
  const viewAngles = [-30, 0, 30];

  const [goFish, setGoFish] = useState(true);

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
        // setPlayers(players);
        console.log('입장', newPlayerMap);
        return newPlayerMap;
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
    REPLY: (/** @type {phase}*/ phase, requester, responser) => {
      setCurrentPhase(prev => {
        console.log(prev, '=>', phase);
        return phase;
      });
      setCurrentPlayer(requester);
      setSelectedPlayer(responser);
      setGoFish(true);
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

  // const stompClient = getStomp();
  // const { subscriberMap, session, publisher, openViduInitializer } = useOpenVidu({
  //   sessionId: roomId,
  //   userId,
  //   nickname,
  // });

  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscriberMap, setSubscriberMap] = useState({});

  const [stompClient, setStompClient] = useState(null);

  function handleBeforeunload() {
    session.disconnect();
    disconnect(stompClient);
  }

  useEffect(() => {
    setStompClient(() => {
      const stompClient = getStomp();
      connect({ stompClient, roomId, userId, nickname, callbacks });
      return stompClient;
    });

    initOpenVidu({
      sessionId: roomId,
      userId,
      nickname,
      setSubscriberMap,
      setSession,
      setPublisher,
    });

    window.addEventListener('beforeunload', handleBeforeunload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
    };
  }, []);

  return (
    <Container>
      <div className={styles.filter}></div>
      <Notice {...{ pinNumber, currentPhase }} />

      <Perspective1>
        <Perspective2>
          <Rotater rotateY={viewAngles[view]}>
            <Table />
            {Object.keys(subscriberMap)
              .filter(userId => userId != me)
              .map((key, idx, arr) => (
                <SubUI deg={(180 / (arr.length * 2)) * (idx * 2 + 1)} key={idx}>
                  <ReplyButtonHolder
                    condition={
                      currentPlayer === Number(key) &&
                      currentPhase === 'REPLY_TURN' &&
                      selectedPlayer === me &&
                      (playerMap[me].cardsOnHand.findIndex(card => card.cardId === selectedCard) ===
                        -1 ||
                        !goFish)
                    }
                  >
                    <HoverButton
                      text1={
                        playerMap[me].cardsOnHand.findIndex(
                          card => card.cardId === selectedCard
                        ) === -1
                          ? 'FISH'
                          : '주기'
                      }
                      text2={
                        playerMap[me].cardsOnHand.findIndex(
                          card => card.cardId === selectedCard
                        ) === -1
                          ? 'SSA'
                          : 'ㅠㅠ'
                      }
                      onClick={() =>
                        reply({
                          stompClient,
                          roomId,
                          requester: currentPlayer,
                          responser: selectedPlayer,
                          goFish,
                        })
                      }
                    />
                  </ReplyButtonHolder>
                  <SubCam
                    subscriber={subscriberMap[key]}
                    current={currentPlayer === Number(key)}
                    selected={selectedPlayer === Number(key)}
                    onClick={() => {
                      setSelectedPlayer(selectedPlayer => {
                        if (currentPlayer === me && currentPhase === 'SELECT_PLAYER_TURN') {
                          const newSelectedPlayer = selectedPlayer == key ? null : key;
                          testPlayer({ stompClient, roomId, player: newSelectedPlayer });
                          return newSelectedPlayer;
                        }
                        return selectedPlayer;
                      });
                    }}
                    mediapipe={true}
                  />
                  <SubHands cards={playerMap[key].cardsOnHand} />
                  <SubPoints cards={playerMap[key].cardsEnrolled} />
                  <SelectPlayerButtonHolder
                    condition={
                      currentPhase === 'SELECT_PLAYER_TURN' &&
                      currentPlayer === me &&
                      selectedPlayer === Number(key)
                    }
                  >
                    <HoverButton
                      {...{
                        text1: '선택?',
                        text2: '완료!',
                        onClick: () =>
                          selectPlayer({
                            stompClient,
                            roomId,
                            requester: currentPlayer,
                            responser: selectedPlayer,
                          }),
                      }}
                    />
                  </SelectPlayerButtonHolder>
                </SubUI>
              ))}
          </Rotater>
        </Perspective2>
      </Perspective1>

      <PubUI>
        <PubTogglersContainer>
          <PubTogglers {...{ publisher, setWebcamRunning }} />
        </PubTogglersContainer>
        <PubCam
          {...{
            webcamRunning,
            setWebcamRunning,
            current: currentPlayer === me,
            selected: selectedPlayer === me,
            mediapipe: true,
          }}
        />
        <PubHandsContainer condition={currentPhase !== 'WAITING'}>
          <PubHands
            hand={hand}
            current={currentPlayer === me}
            selected={selectedPlayer === me}
            currentPhase={currentPhase}
            cards={playerMap[me]?.cardsOnHand}
            setSelectedCard={setSelectedCard}
            selectedCard={selectedCard}
            setGoFish={setGoFish}
          />
          <SelectCardButtonHolder
            condition={
              hand && currentPlayer === me && currentPhase === 'SELECT_CARD_TURN' && selectedCard
            }
          >
            <HoverButton
              text1={'선택?'}
              text2={'완료!'}
              onClick={() =>
                selectCard({ stompClient, roomId, player: currentPlayer, cardId: selectedCard })
              }
            />
          </SelectCardButtonHolder>
          <HandToggler onClick={() => setHand(hand => !hand)} />
        </PubHandsContainer>
        <StartButtonHolder condition={currentPhase === 'WAITING'}>
          <HoverButton
            {...{
              text1: '준비?',
              text2: '시작!',
              onClick: () => startGame({ stompClient, roomId }),
            }}
          />
        </StartButtonHolder>
      </PubUI>

      <RotateButtonContainer>
        <RotateButton
          condition={view > 0}
          onClick={() => {
            setView(view => (view === 0 ? 0 : view - 1));
          }}
        >
          <FiChevronsLeft />
        </RotateButton>
        <RotateButton
          condition={view < 2}
          onClick={() => {
            setView(view => (view === 2 ? 2 : view + 1));
          }}
        >
          <FiChevronsRight />
        </RotateButton>
      </RotateButtonContainer>

      <SelectedCardContainer
        {...{ selectedCard: selectedCard ? cardMapRef.current[selectedCard] : null }}
      >
        <SelectedCard
          {...{ card, selectedCard: selectedCard ? cardMapRef.current[selectedCard] : null }}
        />
        <CardToggler onClick={() => setCard(card => !card)} />
      </SelectedCardContainer>
    </Container>
  );
}
function ReplyButtonHolder({ condition, children }) {
  if (condition) return <div className={`${styles.ReplyButtonHolder}`}>{children}</div>;
}

function RotateButtonContainer({ children }) {
  return <div className={`${styles.RotateButtonContainer}`}>{children}</div>;
}

function PubTogglersContainer({ children }) {
  return <div className={`${styles.PubTogglersContainer}`}>{children}</div>;
}

function SelectCardButtonHolder({ condition, children }) {
  if (condition) return <div className={`${styles.SelectCardButtonHolder}`}>{children}</div>;
}

function PubHandsContainer({ condition, children }) {
  if (condition) return <div className={`${styles.PubHandsContainer}`}>{children}</div>;
}

function PubHands({
  setSelectedCard,
  cards,
  hand,
  selectedCard,
  current,
  selected,
  currentPhase,
  setGoFish,
}) {
  function unit(idx) {
    const centerIdx = (cards.length - 1) / 2;
    return idx - centerIdx;
  }

  function translateX(idx) {
    return `calc(${unit(idx)}*var(--table-radius)*0.2*${
      cards.length <= 4 ? 0.6 : 4 / (cards.length + 1)
    })`;
  }

  function translateY(idx) {
    return `calc(
      ${1 - Math.sin(((unit(idx) * 10 + 90) / 180) * Math.PI)}
      *var(--table-radius)
      *${cards.length <= 4 ? 1 : 4 / (cards.length + 1)}
      -
      ${1 - Math.sin(((unit((cards.length - 1) / 2) * 10 + 90) / 180) * Math.PI)}
      *var(--table-radius)
      *${cards.length <= 4 ? 1 : 4 / (cards.length + 1)}
    )`;
  }

  function rotateZ(idx) {
    return `${unit(idx) * 10 * (cards.length <= 4 ? 1 : 4 / (cards.length + 1))}deg`;
  }

  if (hand && cards)
    return (
      <div className={`${styles.PubHands}`}>
        <div>
          {cards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (current && currentPhase === 'SELECT_CARD_TURN') setSelectedCard(card.cardId);
                if (selected && currentPhase === 'REPLY_TURN' && selectedCard === card.cardId) {
                  setGoFish(false);
                }
              }}
              style={{
                pointerEvents: 'all',
              }}
            >
              <Card
                {...card}
                style={{
                  position: 'absolute',
                  transformOrigin: 'bottom center',
                  bottom: 0,
                  border:
                    (current && selectedCard === card.cardId) ||
                    (selected && currentPhase === 'REPLY_TURN' && selectedCard === card.cardId)
                      ? 'solid 5px white'
                      : '',
                  transform: `
                  ${`translateX(calc(${translateX(idx)} - 100px))`}
                  ${`translateY(${translateY(idx)})`}
                  ${`rotateZ(${rotateZ(idx)})`}
                  `,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
}

function StartButtonHolder({ condition, children }) {
  if (condition) return <div className={`${styles.StartButtonHolder}`}>{children}</div>;
}
function SelectPlayerButtonHolder({ condition, children }) {
  if (condition) return <div className={`${styles.SelectPlayerButtonHolder}`}>{children}</div>;
}

function SelectedCardContainer({ selectedCard, children }) {
  if (selectedCard) return <div className={`${styles.SelectedCardContainer}`}>{children}</div>;
}

function SelectedCard({ card, selectedCard }) {
  if (card && selectedCard)
    return (
      <div className={styles.SelectedCard}>
        <Card
          {...{ ...selectedCard, width: '200px', height: '300px' }}
          style={{ position: 'absolute' }}
        />
      </div>
    );
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function SubUI({ children, deg }) {
  const style = {
    '--rotate-y': `${deg - 90}deg`,
    '--translate-x': Math.cos(deg2rad(deg)),
    '--translate-z': Math.sin(deg2rad(180 + deg)),
  };
  return (
    <div className={`${styles.SubUI}`} style={style}>
      {children}
    </div>
  );
}
function SubHands({ cards }) {
  function unit(idx) {
    const centerIdx = (cards.length - 1) / 2;
    return idx - centerIdx;
  }
  function translateX(idx) {
    return `calc(${unit(idx)}*var(--table-radius)*0.2*${
      cards.length <= 4 ? 0.6 : 4 / (cards.length + 1)
    })`;
  }
  function translateY(idx) {
    return `calc(
      ${1 - Math.sin(((unit(idx) * 10 + 90) / 180) * Math.PI)}
      *var(--table-radius)
      *${cards.length <= 4 ? 1 : 4 / (cards.length + 1)}
      -
      ${1 - Math.sin(((unit((cards.length - 1) / 2) * 10 + 90) / 180) * Math.PI)}
      *var(--table-radius)
      *${cards.length <= 4 ? 1 : 4 / (cards.length + 1)}
    )`;
  }
  function rotateZ(idx) {
    return `${unit(idx) * 10 * (cards.length <= 4 ? 1 : 4 / (cards.length + 1))}deg`;
  }
  return (
    <div className={`${styles.SubHands}`}>
      {cards.map((card, idx) => (
        <Card
          {...card}
          key={idx}
          flipped={true}
          style={{
            position: 'absolute',
            bottom: 0,
            translate: `${translateX(idx)} ${translateY(idx)} 0`,
            rotate: `z ${rotateZ(idx)}`,
          }}
        />
      ))}
    </div>
  );
}
function SubPoints({ cards }) {
  function unit(idx) {
    const centerIdx = (cards.length - 1) / 2;
    return idx - centerIdx;
  }
  function translateX(idx) {
    return `calc(${unit(idx)}*var(--table-radius)*0.2*${
      cards.length <= 4 ? 0.6 : 4 / (cards.length + 1)
    })`;
  }
  function translateY(idx) {
    return `calc(
      ${1 - Math.sin(((unit(idx) * 10 + 90) / 180) * Math.PI)}
      *var(--table-radius)
      *${cards.length <= 4 ? 1 : 4 / (cards.length + 1)}
      -
      ${1 - Math.sin(((unit((cards.length - 1) / 2) * 10 + 90) / 180) * Math.PI)}
      *var(--table-radius)
      *${cards.length <= 4 ? 1 : 4 / (cards.length + 1)}
    )`;
  }
  function rotateZ(idx) {
    return `${unit(idx) * 10 * (cards.length <= 4 ? 1 : 4 / (cards.length + 1))}deg`;
  }
  return (
    <div className={`${styles.SubPoints}`}>
      {cards.map((card, idx) => (
        <Card
          {...card}
          key={idx}
          style={{
            position: 'absolute',
            bottom: 0,
            translate: `${translateX(idx)} ${translateY(idx)} 0`,
            rotate: `z ${rotateZ(idx)}`,
          }}
        />
      ))}
    </div>
  );
}

function Container({ children }) {
  return <div className={`${styles.Container}`}>{children}</div>;
}

function PubUI({ children }) {
  return <div className={`${styles.PubUI}`}>{children}</div>;
}

function Perspective1({ children }) {
  return <div className={`${styles.Perspective1}`}>{children}</div>;
}
function Perspective2({ children }) {
  return <div className={`${styles.Perspective2}`}>{children}</div>;
}
function Rotater({ children, rotateY }) {
  return (
    <div className={`${styles.Rotater}`} style={{ rotate: `y ${rotateY}deg` }}>
      {children}
    </div>
  );
}
function Table() {
  return <div className={`${styles.Table}`}></div>;
}
