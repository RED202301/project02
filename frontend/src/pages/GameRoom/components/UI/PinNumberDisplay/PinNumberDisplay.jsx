import styles from './PinNumberDisplay.module.scss';

export default function PinNumberDisplay(/** @type {string}*/ { pinNumber }) {
  function handleClick() {
    navigator.clipboard.writeText(pinNumber).then(() => {
      alert('핀 번호가 클립보드에 저장되었습니다.');
    });
  }

  return (
    <div className={`${styles.PinNumberDisplay}`} onClick={handleClick}>
      <div>핀 번호 저장</div>
      <div>{pinNumber}</div>
    </div>
  );
}