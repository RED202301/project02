import styles from './CardSubtitle.module.scss';

export default function CardSubtitle({ subtitle, rotateX, rotateY }) {
  return (
    <div
      className={styles.CardSubtitle}
      style={{ translate: `${rotateX * 20}px ${rotateY * 20}px` }}
    >
      {subtitle}
    </div>
  );
}
