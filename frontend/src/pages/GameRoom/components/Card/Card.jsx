import { useRef } from 'react';
import Back from './Back/Back';
import Front from './Front/Front';
import styles from './Card.module.scss';

// /** @typedef {{cardId:number, name:string, imageUrl:string, point:number}} Card*/
/** @typedef {{cardId:number, mainTitle:string, subTitle:string, mainImgUrl:string, point:number}} Card*/
/** @typedef {Map<string, Card>} cardMap*/

export default function Card({
  cardId,
  mainTitle,
  subTitle,
  mainImgUrl,
  point,
  width,
  height,
  style,
  flipped,
  onClick,
}) {
  /** @type {React.MutableRefObject<HTMLDivElement>} */
  cardId;
  const CardRef = useRef();
  return (
    <div
      onClick={onClick}
      ref={CardRef}
      className={`${styles.Card} ${flipped && styles.flipped}`}
      style={{ ...style, '--width': width || '200px', '--height': height || '300px' }}
    >
      <Back />
      <Front {...{ mainTitle, subTitle, point, mainImgUrl }}></Front>
    </div>
  );
}
