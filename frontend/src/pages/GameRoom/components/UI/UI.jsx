import PinNumberDisplay from './PinNumberDisplay/PinNumberDisplay';
import RotationController from './RotationController/RotationController';
import PublisherCAM from './PublisherCAM/PublisherCAM';
import CardsOnHand from '../Cards/CardsOnHand';
import styles from './UI.module.scss';
import Card from '../../../../components/Card/Card';
/** @typedef {import('../../typedef')} */

export default function UI(
  /** @type {{pinNumber:string, player:Player, currentPlayer:number, selectedPlayer:number, currentPhase:phase, isGoFish:boolean, publisher:Publisher, selectedCard:number}}*/ {
    pinNumber,
    player,
    currentPlayer, // 내 차례인지
    selectedPlayer, // 내가 선택됐는지
    currentPhase, // 조작 가능한지
    isGoFish, // 나중에 고피쉬용 버튼
    selectedCard, // 나중에 선택된 카드 보여주기
    publisher,
    children,
  }
) {
  return (
    <div className={`${styles.UI}`}>
      {children}
      <PublisherCAM {...{ publisher }} />
      <RotationController />
      <PinNumberDisplay {...{ pinNumber }} />
      <div className={`${styles.myHand}`}>
        {player ? <CardsOnHand cards={player.cardsOnHand} /> : <></>}
      </div>
      {/* (selectedCard? <Card {...{ ...selectedCard, width: '200px', height: '300px' }} />:<></>) */}
    </div>
  );
}
