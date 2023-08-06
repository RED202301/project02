import styles from './Card.module.scss';

// HOC
import withDragging from './HOC/withDragging/withDragging';
import withTilting from './HOC/withTilting/withTilting';
import withHovering from './HOC/withHovering/withHovering';
import withScaler from './HOC/withScaler/withScaler';

// Components
import CardFront from './CardFront/CardFront';
import CardBack from './CardBack/CardBack';

/// <reference path="types.js" />

function Card(props) {
  const Card = withScaler(withDragging(withTilting(withHovering(CardWapper))));
  return <Card {...props} />;
}
export default Card;

function CardWapper({ title, subtitle, img_url, bg_url, rotateX, rotateY }) {
  return (
    <div className={`${styles.CardWapper}`}>
      <CardFront {...{ bg_url, img_url, subtitle, title, rotateX, rotateY }} />
      <CardBack {...{ bg_url, rotateX, rotateY }} />
    </div>
  );
}
