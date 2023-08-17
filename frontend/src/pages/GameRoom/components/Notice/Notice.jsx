import { FaPaperclip } from 'react-icons/fa';
import styles from './Notice.module.scss';

export default function Notice(
  /** @type {string}*/ {
    pinNumber,
    currentPhase,
    current,
    selected,
    playerMap,
    currentPlayer,
    selectedPlayer,
    cardMap,
    selectedCard,
    goFish,
    winners,
  }
) {
  function handleClick() {
    navigator.clipboard.writeText(pinNumber).then(() => {
      alert('핀 번호가 클립보드에 저장되었습니다.');
    });
  }

  if (currentPhase === 'WAITING') {
    return (
      <div className={styles.NoticeContainer}>
        <div className={styles.shadow} onClick={handleClick}>
          <input className={styles.Notice} type="text" value={`PIN : ${pinNumber}`} disabled />
          <button className={styles.Clip}>
            <FaPaperclip />
          </button>
        </div>
      </div>
    );
  }

  const notice = {
    AUTO_DRAW: `카드를 뽑는 중...`,
    ENROLL: `카드 등록 중...`,
    SELECT_PLAYER_TURN: current
      ? `질문할 대상을 골라주세요!`
      : `${currentPlayer && playerMap[currentPlayer]?.nickname} : 질문할 대상 고르는 중...`,
    SELECT_PLAYER: `대상자는 '${selectedPlayer && playerMap[selectedPlayer]?.nickname}'!`,
    SELECT_CARD_TURN: current
      ? `질문할 카드를 골라주세요!`
      : `${currentPlayer && playerMap[currentPlayer]?.nickname} : 질문할 카드 고르는 중...`,
    SELECT_CARD: `카드는 '${selectedCard && cardMap[selectedCard]?.mainTitle}'!`,
    REPLY_TURN: selected
      ? `'${selectedCard && cardMap[selectedCard]?.mainTitle}' 카드가 있나요?`
      : `${selectedPlayer && playerMap[selectedPlayer]?.nickname} : 답변하는 중...`,
    REPLY: goFish ? `SSAFISH!` : `질문 성공!`,
    CARD_MOVE: `카드 이동 중...`,
    END_GAME: `게임이 종료되었습니다!`,
    WINNER_CEREMONY: `🏆 ${winners && winners?.map(({ nickname }) => nickname)?.join(', ')}`,
  };

  return (
    <div className={styles.NoticeContainer}>
      <input className={styles.Notice} type="text" value={`${notice[currentPhase]}`} disabled />
    </div>
  );
}
