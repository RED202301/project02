import styles from './CardTitle.module.scss';

export default function CardTitle({ title, rotateX, rotateY }) {
  return (
    <div className={styles.CardTitle} style={{ translate: `${rotateX * 20}px ${rotateY * 20}px` }}>
      {title}
    </div>
  );
}
