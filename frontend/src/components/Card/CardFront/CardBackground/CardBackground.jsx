import styles from './CardBackground.module.scss';

export default function CardBackground({ bg_url, rotateX, rotateY }) {
  return (
    <div
      className={`${styles.CardBackground}`}
      style={{
        backgroundImage: `url(${bg_url})`,
        backgroundPosition: `${rotateX * -10}px ${rotateY * -10}px`,
      }}
    />
  );
}
