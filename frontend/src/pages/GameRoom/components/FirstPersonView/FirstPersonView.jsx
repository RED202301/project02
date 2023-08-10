import OpponentContainers from './OpponentContainers/OpponentContainers';
import Table from './Table/Table';
import CardsEnrolled from '../Cards/CardsEnrolled';
import styles from './FirstPersonView.module.scss';
/** @typedef {import('../../typedef')} */

export default function FirstPersonView(
  /** @type {{playerMap:playerMap, userId:Number, subscriberMap:subscriberMap, currentPlayer:number, selectedPlayer:number, currentPhase:phase}} */ {
    playerMap,
    userId,
    subscriberMap, // 비디오 화면
    currentPlayer, // 차례 플레이어 테두리
    selectedPlayer, // 선택된 플레이어 테두리
    currentPhase, // 현재 차례에 따라서 조작 가능 여부
  }
) {
  return (
    <div className={`${styles.FirstPersonView}`}>
      <div className={`${styles.Perspective}`}>
        <div className={`${styles.Rotater}`}>
          <OpponentContainers
            {...{ playerMap, userId, subscriberMap, currentPlayer, selectedPlayer, currentPhase }}
          />
          <Table />
          {playerMap[userId] ? <CardsEnrolled cards={playerMap[userId].cardsEnrolled} /> : <></>}
        </div>
      </div>
    </div>
  );
}
