import { useEffect, useRef, useState } from 'react';
import Card from './components/Card/Card';
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

import { confetti } from 'https://cdn.jsdelivr.net/npm/tsparticles-confetti/+esm';
import Neon from './components/Neon/Neon';

function run() {
  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });

    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < Date.now() + 15 * 1000) {
      requestAnimationFrame(frame);
    }
  })();
}

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

  const [hidden, setHidden] = useState(false);
  const [card, setCard] = useState(true);

  const [view, setView] = useState(1);
  const viewAngles = [-30, 0, 30];

  const [goFish, setGoFish] = useState(true);
  const [winners, setWinners] = useState(null);

  const cardAudio = useRef();

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
        // console.log('입장', newPlayerMap);
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
      setCurrentPhase(phase);
      // setCardMap(cardMap);
      cardMapRef.current = cardMap;
      // console.log(cardMap);
    },
    AUTO_DRAW: (/** @type {phase}*/ phase, userId, cardId) => {
      setSelectedPlayer(null);
      setCurrentPlayer(null);
      setSelectedCard(null);
      setCurrentPhase(phase);
      setPlayerMap(playerMap => {
        const newPlayerMap = { ...playerMap };
        newPlayerMap[userId].draw(cardMapRef.current[cardId]);
        // console.log(cardMapRef.current, cardId, cardMapRef.current[cardId]);
        return newPlayerMap;
      });
      cardAudio.current.play();
    },
    ENROLL: (/** @type {phase}*/ phase, userId, cardId) => {
      setCurrentPhase(phase);
      setPlayerMap(playerMap => {
        const newPlayerMap = { ...playerMap };
        newPlayerMap[userId].enroll(cardId);
        return newPlayerMap;
      });
      cardAudio.current.play();
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
    REPLY: (/** @type {phase}*/ phase, requester, responser) => {
      setCurrentPhase(phase);
      setCurrentPlayer(requester);
      setSelectedPlayer(responser);
    },
    CARD_MOVE: (/** @type {phase}*/ phase, from, to) => {
      setGoFish(true);
      setCurrentPhase(phase);
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
      cardAudio.current.play();
    },
    END_GAME: (/** @type {phase}*/ phase) => {
      setSelectedPlayer(null);
      setCurrentPlayer(null);
      setCurrentPhase(phase);
    },
    WINNER_CEREMONY: (/** @type {phase}*/ phase, players) => {
      setCurrentPhase(phase);
      setWinners(players);
      run();
    },
  };

  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscriberMap, setSubscriberMap] = useState({});

  const [stompClient, setStompClient] = useState(null);

  function handleBeforeunload() {
    session.disconnect();
    disconnect(stompClient);
  }

  useEffect(() => {
    cardAudio.current = new Audio('./src/assets/cardAudio.mp3');
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
      {/* <div className={styles.filter}></div> */}
      <Notice
        {...{
          pinNumber,
          currentPhase,
          current: currentPlayer === me,
          selected: selectedPlayer === me,
          playerMap,
          currentPlayer,
          selectedPlayer,
          cardMap: cardMapRef.current,
          selectedCard,
          goFish,
          winners,
        }}
      />

      <Perspective1>
        <Perspective2>
          <Rotater rotateY={viewAngles[view]}>
            <Table />
            {Object.keys(subscriberMap)
              .filter(userId => userId != me)
              .map((key, idx, arr) => (
                <SubUI deg={(180 / (arr.length + 1)) * (idx + 1)} key={idx}>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '700px',
                      whiteSpace: 'nowrap',
                      zIndex: 10,
                    }}
                  >
                    <Neon
                      fontSize={'100px'}
                      current={currentPlayer === Number(key)}
                      selected={selectedPlayer === Number(key)}
                      able={
                        currentPlayer === me &&
                        currentPhase === 'SELECT_PLAYER_TURN' &&
                        !selectedPlayer
                      }
                    >
                      {JSON.parse(subscriberMap[key].stream.connection.data)['nickname']}
                    </Neon>
                  </div>
                  <ReplyButtonHolder
                    condition={
                      currentPlayer === Number(key) &&
                      currentPhase === 'REPLY_TURN' &&
                      selectedPlayer === me &&
                      (playerMap[me]?.cardsOnHand?.findIndex(
                        card => card.cardId === selectedCard
                      ) === -1 ||
                        !goFish)
                    }
                  >
                    <HoverButton
                      text1={
                        playerMap[me]?.cardsOnHand?.findIndex(
                          card => card.cardId === selectedCard
                        ) === -1
                          ? 'FISH!'
                          : '주기'
                      }
                      text2={
                        playerMap[me]?.cardsOnHand?.findIndex(
                          card => card.cardId === selectedCard
                        ) === -1
                          ? 'GO'
                          : 'ㅠㅠ'
                      }
                      width="400px"
                      onClick={() =>
                        reply({
                          stompClient,
                          roomId,
                          requester: currentPlayer,
                          responser: selectedPlayer,
                          goFish,
                        })
                      }
                      color="#F9BB3B"
                    />
                  </ReplyButtonHolder>
                  <SubCam
                    subscriber={subscriberMap[key]}
                    current={currentPlayer === Number(key)}
                    selected={selectedPlayer === Number(key)}
                    able={
                      currentPlayer === me &&
                      currentPhase === 'SELECT_PLAYER_TURN' &&
                      !selectedPlayer
                    }
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
                  <SubHands cards={playerMap[key]?.cardsOnHand} />
                  <SubPoints cards={playerMap[key]?.cardsEnrolled} />
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
                        width: '400px',
                        color: '#8BADD5',
                      }}
                    />
                  </SelectPlayerButtonHolder>
                </SubUI>
              ))}

            <PubPoints cards={playerMap[me]?.cardsEnrolled} />
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
          {/* <PubHandsContainer condition={true}> */}
          <PubHands
            hidden={hidden}
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
              !hidden && currentPlayer === me && currentPhase === 'SELECT_CARD_TURN' && selectedCard
            }
          >
            <HoverButton
              text1={'선택?'}
              text2={'완료!'}
              onClick={() =>
                selectCard({ stompClient, roomId, player: currentPlayer, cardId: selectedCard })
              }
              color="yellowgreen"
            />
          </SelectCardButtonHolder>
          <HandTogglerHolder>
            <HandToggler onClick={() => setHidden(hidden => !hidden)} />
          </HandTogglerHolder>
        </PubHandsContainer>
      </PubUI>
      <StartButtonHolder condition={currentPhase === 'WAITING'}>
        <HoverButton
          {...{
            text1: '준비?',
            text2: '시작!',
            onClick: () => startGame({ stompClient, roomId }),
            width: '400px',
            color: 'yellowgreen',
          }}
        />
      </StartButtonHolder>

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
        <CardTogglerHolder>
          <CardToggler onClick={() => setCard(card => !card)} />
        </CardTogglerHolder>
      </SelectedCardContainer>
    </Container>
  );
}
function HandTogglerHolder({ children }) {
  return <div className={styles.HandTogglerHolder}>{children}</div>;
}

function PubPoints({ cards }) {
  function unit(idx) {
    const centerIdx = (cards.length - 1) / 2;
    return idx - centerIdx;
  }
  function translateX(idx) {
    const offset = cards.length * 7;
    return unit(idx) * -offset;
  }

  if (cards)
    return (
      <div className={`${styles.PubPoints}`}>
        {cards.map((card, idx) => (
          <Card
            key={idx}
            {...{
              ...card,
              enrolled: true,
              width: '200px',
              height: '300px',
              translateX: `${translateX(idx)}px`,
              translateY: `100px`,
            }}
          />
        ))}
      </div>
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
  hidden,
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
  function angle(idx) {
    return 10 * unit(idx);
  }
  function rad(idx) {
    return (angle(idx) / 180) * Math.PI;
  }
  function translateX(idx) {
    return -Math.sin(rad(idx));
  }
  function translateY(idx) {
    return -Math.cos(rad(idx));
  }

  function getHandleClick(card) {
    function handleClick() {
      if (current && currentPhase === 'SELECT_CARD_TURN') setSelectedCard(card.cardId);
      if (selected && currentPhase === 'REPLY_TURN' && selectedCard === card.cardId) {
        setGoFish(false);
      }
    }
    return handleClick;
  }

  // cards = [
  //   {
  //     cardId: 1,
  //     mainTitle: '지젤',
  //     subTitle: '에스파',
  //     mainImgUrl: './지젤.webp',
  //     point: 3,
  //   },
  //   {
  //     cardId: 1,
  //     mainTitle: '지젤',
  //     subTitle: '에스파',
  //     mainImgUrl: './지젤.webp',
  //     point: 3,
  //   },
  //   {
  //     cardId: 1,
  //     mainTitle: '지젤',
  //     subTitle: '에스파',
  //     mainImgUrl: './지젤.webp',
  //     point: 3,
  //   },
  //   {
  //     cardId: 1,
  //     mainTitle: '지젤',
  //     subTitle: '에스파',
  //     mainImgUrl: './지젤.webp',
  //     point: 3,
  //   },
  //   {
  //     cardId: 1,
  //     mainTitle: '지젤',
  //     subTitle: '에스파',
  //     mainImgUrl: './지젤.webp',
  //     point: 3,
  //   },
  //   {
  //     cardId: 1,
  //     mainTitle: '지젤',
  //     subTitle: '에스파',
  //     mainImgUrl: './지젤.webp',
  //     point: 3,
  //   },
  //   {
  //     cardId: 1,
  //     mainTitle: '지젤',
  //     subTitle: '에스파',
  //     mainImgUrl: './지젤.webp',
  //     point: 3,
  //   },
  //   {
  //     cardId: 1,
  //     mainTitle: '지젤',
  //     subTitle: '에스파',
  //     mainImgUrl: './지젤.webp',
  //     point: 3,
  //   },
  //   {
  //     cardId: 1,
  //     mainTitle: '지젤',
  //     subTitle: '에스파',
  //     mainImgUrl: './지젤.webp',
  //     point: 3,
  //   },
  // ];
  if (cards)
    return (
      <div className={`${styles.PubHands}`}>
        {cards.map((card, idx) => (
          <Card
            key={idx}
            {...{
              ...card,
              width: '150px',
              height: '225px',
              onHand: true,
              angle: `${angle(idx)}deg`,
              offset: '50px',
              handleClick: getHandleClick(card),
              translateX: `${translateX(idx) * 200}px`,
              translateY: `${translateY(idx) * 200 + 150}px`,
              hidden,
              selected: card.cardId === Number(selectedCard),
              able:
                (current && currentPhase === 'SELECT_CARD_TURN') ||
                (selected && currentPhase === 'REPLY_TURN' && selectedCard === card.cardId),
            }}
          />
        ))}
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
function CardTogglerHolder({ children }) {
  return <div className={styles.CardTogglerHolder}>{children}</div>;
}

function SelectedCard({ card, selectedCard }) {
  if (card && selectedCard)
    return (
      <div className={styles.SelectedCard}>
        <Card {...{ ...selectedCard, width: '200px', height: '300px' }} />
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
  function angle(idx) {
    return 10 * unit(idx);
  }
  function rad(idx) {
    return (angle(idx) / 180) * Math.PI;
  }
  function translateX(idx) {
    return -Math.sin(rad(idx));
  }
  function translateY(idx) {
    return -Math.cos(rad(idx));
  }

  if (cards)
    return (
      <div className={`${styles.SubHands}`}>
        {cards.map((card, idx) => (
          <Card
            key={idx}
            {...{
              ...card,
              width: '150px',
              height: '225px',
              onHand: true,
              angle: `${angle(idx)}deg`,
              offset: '50px',
              translateX: `${translateX(idx) * 200}px`,
              translateY: `${translateY(idx) * 200 + 250}px`,
              flipped: true,
              opponent: true,
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
    const offset = cards.length * 7;
    return unit(idx) * -offset;
  }

  if (cards)
    return (
      <div className={`${styles.SubPoints}`}>
        {cards.map((card, idx) => (
          <Card
            key={idx}
            {...{
              ...card,
              enrolled: true,
              width: '200px',
              height: '300px',
              translateX: `${translateX(idx)}px`,
              translateY: `-300px`,
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
