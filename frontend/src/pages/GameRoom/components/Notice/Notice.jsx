import { FaPaperclip } from 'react-icons/fa';
import styles from './Notice.module.scss';

export default function Notice(/** @type {string}*/ { pinNumber, currentPhase }) {
  function handleClick() {
    navigator.clipboard.writeText(pinNumber).then(() => {
      alert('핀 번호가 클립보드에 저장되었습니다.');
    });
  }

  if (currentPhase === 'WAITING') {
    return (
      <div className={styles.NoticeContainer}>
        <input className={styles.Notice} type="text" value={`핀 번호 : ${pinNumber}`} disabled />
        <button className={styles.Clip} onClick={handleClick}>
          <FaPaperclip />
        </button>
      </div>
    );
  }

  const notice = {
    AUTO_DRAW: `카드 드로우`,
    ENROLL: `카드 등록`,
    SELECT_PLAYER_TURN: `플레이어 선택 단계`,
    SELECT_PLAYER: `플레이어 선택`,
    SELECT_CARD_TURN: `카드 선택 단계`,
    SELECT_CARD: `카드 선택`,
    REPLY_TURN: `대답 단계`,
    REPLY: `대답`,
    CARD_MOVE: `카드 이동`,
    END_GAME: `게임 종료`,
    WINNER_CEREMONY: `승자 세레머니`,
  };

  return (
    <div className={styles.NoticeContainer}>
      <input className={styles.Notice} type="text" value={`${notice[currentPhase]}`} disabled />
    </div>
  );
}
