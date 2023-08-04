import CardBackground from '../CardFront/CardBackground/CardBackground';
import CardSubject from '../CardFront/CardSubject/CardSubject';
import styles from './CardBack.module.scss';
CardBackground;

export default function CardBack({ bg_url, rotateX, rotateY }) {
  return (
    <div className={`${styles.CardBack}`}>
      <CardBackground {...{ bg_url, rotateX, rotateY }} />
      <CardSubject {...{ img_url: './sample_imgs/SSAFISH.png', rotateX, rotateY }} />
    </div>
  );
}
