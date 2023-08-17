import styles from './Background.module.scss';

export default function Background({ children }) {
  return (
    <div className={`${styles.Background}`}>
      <div className={styles.Top}>{children}</div>
      <div className={styles.Mid} />
      <div className={styles.Bot} />
    </div>
  );
}
