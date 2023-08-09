import CardSubtitle from './CardSubtitle/CardSubtitle';
import CardTitle from './CardTitle/CardTitle';
import styles from './CardText.module.scss';

export default function CardText({ subtitle, title, rotateX, rotateY }) {
  return (
    <div className={`${styles.CardText}`}>
      <CardSubtitle {...{ subtitle, rotateX, rotateY }} />
      <CardTitle {...{ title, rotateX, rotateY }} />
    </div>
  );
}
