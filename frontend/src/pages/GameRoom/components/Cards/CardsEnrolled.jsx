import Card from './Card/Card';
import styles from './CardsEnrolled.module.scss';
/** @typedef {import('./Card/Card').Card} Card */

export default function CardsEnrolled(/** @type {{cards:Card[]}} */ { cards }) {
  // const card_info = {
  //   cardId: 1,
  //   mainTitle: '지젤',
  //   subTitle: '에스파',
  //   mainImgUrl: './지젤.webp',
  //   point: 3,
  // };
  // cards = [
  //   card_info,
  //   card_info,
  //   // card_info,
  //   card_info,
  //   card_info,
  //   card_info,
  //   card_info,
  //   card_info,
  //   card_info,
  // ];
  function unit(idx) {
    const centerIdx = (cards.length - 1) / 2;
    return idx - centerIdx;
  }
  return (
    <div
      className={`${styles.CardsEnrolled}`}
      style={{
        // rotate: userId === me ? '0 0 1 180deg' : '0 0 0 180deg',
        rotate: '0 0 1 180deg',
      }}
    >
      {cards.map(({ cardId, mainTitle, subTitle, mainImgUrl, point }, idx) => (
        <Card
          {...{ cardId, mainTitle, subTitle, mainImgUrl, point }}
          key={idx}
          width={'calc(var(--unit)*0.16)'}
          height={'calc(var(--unit)*0.24)'}
          style={{
            position: 'absolute',
            transformOrigin: 'bottom',
            '--translateX': `translateX(calc(${unit(idx)}*var(--unit)*${
              cards.length <= 5 ? 0.15 : 0.6 / (cards.length + 1)
            }))`,
            '--rotateZ': `rotateZ(0)`,
            // '--translateY': userId === me ? `translateY(0)` : `translateY(calc(var(--unit)*0.24))`,
            '--translateY': `translateY(calc(var(--unit)*0.24))`,
            // '--translateY': `translateY(0)`,
          }}
        />
      ))}
    </div>
  );
}
