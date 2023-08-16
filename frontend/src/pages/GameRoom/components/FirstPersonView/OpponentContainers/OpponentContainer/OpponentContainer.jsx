import OpenViduCAM from '../../../OpenViduCAM/OpenViduCAM_bg_removed';
// import OpenViduCAM2 from '../../../OpenViduCAM/OpenViduCAM_origin';
import CardsEnrolled from '../../../Cards/CardsEnrolled';
import CardsOnHand from '../../../Cards/CardsOnHand';
import styles from './OpponentContainer.module.scss';
import { useEffect, useState } from 'react';
/** @typedef {import('openvidu-browser').Subscriber} Subscriber  */

export default function OpponentContainer(
  /** @type {{subscriber:Subscriber, opponent:player, angle:number, setSelectedPlayer:setState<Player>}} */ {
    subscriber,
    opponent,
    angle,
    currentPlayer,
    selectedPlayer,
    setSelectedPlayer,
    currentPhase,
    testPlayerWapper,
  }
) {
  const cos = Math.cos((angle / 180) * Math.PI);
  const sin = Math.sin((-angle / 180) * Math.PI);

  // const [handleClick, setHandleClick] = useState(null);
  const { nickname, userId } = JSON.parse(subscriber.stream.connection.data);

  // const CAMwrapperRef = useRef();
  const me = Number(sessionStorage.getItem('userId'));

  function handleClick() {
    setSelectedPlayer(selectedPlayer => {
      if (currentPlayer === me && currentPhase === 'SELECT_PLAYER_TURN') {
        testPlayerWapper(selectedPlayer === userId ? null : userId);
        return selectedPlayer === userId ? null : userId;
      }
      return selectedPlayer;
    });
  }
  const [style, setStyle] = useState({});
  useEffect(() => {
    if (userId == currentPlayer) {
      setStyle({
        border: 'solid 5px yellowgreen',
        boxShadow: '0 0 calc(var(--unit)*0.2) yellowgreen',
      });
    } else if (userId == selectedPlayer) {
      setStyle({ border: 'solid 5px white', boxShadow: '0 0 calc(var(--unit)*0.2) white' });
    } else {
      setStyle({});
    }
  }, [currentPlayer, selectedPlayer]);

  return opponent ? (
    <div
      className={`${styles.OpponentContainer}`}
      style={{
        '--angle': angle,
        '--cos': cos,
        '--sin': sin,
      }}
    >
      <div className={`${styles.nickname}`}>{nickname}</div>
      <div onClick={handleClick}>
        <OpenViduCAM
          streamManager={subscriber}
          width={`calc(var(--unit))`}
          height={`calc(var(--unit)*3/4)`}
          style={{ ...style }}
        />
      </div>
      <div className={`${styles.OpponentHand}`}>
        <CardsOnHand cards={opponent.cardsOnHand} flipped="true" />
      </div>
      <div className={`${styles.OpponentEnrolled}`}>
        <CardsEnrolled cards={opponent.cardsEnrolled} userId={userId} />
      </div>
    </div>
  ) : (
    <></>
  );
}
