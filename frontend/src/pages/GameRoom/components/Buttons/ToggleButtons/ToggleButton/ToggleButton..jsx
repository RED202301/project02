import styles from './ToggleButton.module.scss';

export default function ToggleButton({ OnIcon, OffIcon, onColor, offColor, onClick, state, size }) {
  return (
    <div
      className={`${styles.togglerOuter}`}
      {...{ onClick }}
      style={{ backgroundColor: state ? onColor : offColor, '--size': size ? size : '4rem' }}
    >
      <div className={`${styles.togglerInner}`}>{state ? <OnIcon /> : <OffIcon />}</div>
    </div>
  );
}
