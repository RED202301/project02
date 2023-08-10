import OpenViduCAM from '../../../OpenViduCAM/OpenViduCAM';
import CardsEnrolled from '../../../Cards/CardsEnrolled';
import CardsOnHand from '../../../Cards/CardsOnHand';
import styles from './OpponentContainer.module.scss';
/** @typedef {import('openvidu-browser').Subscriber} Subscriber  */

export default function OpponentContainer(
  /** @type {{subscriber:Subscriber, opponent:player}} */ { subscriber, opponent, angle }
) {
  const cos = Math.cos((angle / 180) * Math.PI);
  const sin = Math.sin(((180 - angle) / 180) * Math.PI);
  return (
    <div
      className={`${styles.OpponentContainer}`}
      style={{
        '--angle': angle,
        '--cos': cos,
        '--sin': sin,
      }}
    >
      <OpenViduCAM streamManager={subscriber} width={'calc(var(--unit))'} />
      <div className={`${styles.OpponentHand}`}>
        <CardsOnHand cards={opponent.cardsOnHand} flipped="true" />
      </div>
      <div className={`${styles.OpponentEnrolled}`}>
        <CardsEnrolled cards={opponent.cardsEnrolled} />
      </div>
    </div>
  );
}
