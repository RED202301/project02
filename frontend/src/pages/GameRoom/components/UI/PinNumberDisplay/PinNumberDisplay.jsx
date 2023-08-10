import styles from './PinNumberDisplay.module.scss';

export default function PinNumberDisplay(/** @type {string}*/ { pinNumber }) {
  return (
    <div className={`${styles.PinNumberDisplay}`}>
      <div>{pinNumber}</div>
    </div>
  );
}
