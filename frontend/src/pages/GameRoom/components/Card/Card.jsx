import { useEffect, useRef } from 'react';
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
  handleClick,
  onHand,
  enrolled,
  hidden,
  translateX,
  translateY,
  offset,
  angle,
  selected,
  opponent,
  able,
}) {
  cardId;
  /** @type {React.MutableRefObject<HTMLDivElement>} */
  const CardRef = useRef();
  useEffect(() => {
    CardRef.current.classList.remove(styles.init);
  });
  return (
    <div
      className={`${styles.posX} ${hidden && styles.hidden}`}
      style={{ transform: `translateX(${translateX})`, pointerEvents: opponent ? 'none' : 'all' }}
      onClick={handleClick}
    >
      <div className={`${styles.posY}`} style={{ transform: `translateY(${translateY})` }}>
        <div
          onClick={handleClick}
          ref={CardRef}
          className={`
      ${styles.Card} 
      ${styles.init} 
      ${flipped && styles.flipped} 
      ${able && styles.able} 
      ${onHand && styles.onHand} 
      ${enrolled && styles.enrolled} 
      ${selected && styles.selected} 
      `}
          style={{
            ...style,
            '--width': width || '200px',
            '--height': height || '300px',
            '--offset': offset || '0px',
            '--angle': angle || 0,
            pointerEvents: opponent ? 'none' : 'all',
          }}
        >
          <Back />
          {!opponent ? <Front {...{ mainTitle, subTitle, point, mainImgUrl }}></Front> : <></>}
        </div>
      </div>
    </div>
  );
}
