import styles from './RotateButton.module.scss';

export default function RotateButton({ children, onClick, size, condition }) {
  if (condition)
    return (
      <div
        className={`${styles.rotaterOuter}`}
        {...{ onClick }}
        style={{ backgroundColor: 'white', '--size': size ? size : '4rem' }}
      >
        <div className={`${styles.rotaterInner}`}>{children}</div>
      </div>
    );
  return <div></div>;
}
