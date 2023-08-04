import styles from './CardSubject.module.scss';

export default function CardSubject({ img_url, rotateX, rotateY }) {
  return (
    <img
      className={styles.CardSubject}
      src={img_url}
      style={{ translate: `${rotateX * 5}px ${rotateY * 5}px` }}
      draggable="false"
    />
  );
}
