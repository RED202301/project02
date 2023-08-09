import styles from './CardFront.module.scss';
// Components
import CardBackground from './CardBackground/CardBackground';
import CardSubject from './CardSubject/CardSubject';
import CardText from './CardText/CardText';

export default function CardFront({ bg_url, img_url, subtitle, title, rotateX, rotateY }) {
  return (
    <div className={`${styles.CardFront}`}>
      <CardBackground {...{ bg_url, rotateX, rotateY }} />
      <CardSubject {...{ img_url, rotateX, rotateY }} />\
      <CardText {...{ subtitle, title, rotateX, rotateY }} />
    </div>
  );
}
