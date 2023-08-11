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
    <div className={`${styles.CardsEnrolled}`}>
      {cards.map(({ cardId, mainTitle, subTitle, mainImgUrl, point }, idx) => (
        <Card
          {...{ cardId, mainTitle, subTitle, mainImgUrl, point }}
          key={idx}
          width={'calc(var(--unit)*0.2)'}
          height={'calc(var(--unit)*0.3)'}
          style={{
            position: 'absolute',
            transformOrigin: 'bottom',
            '--translateX': `translateX(calc(${unit(idx)}*var(--unit)*0.2*${
              cards.length <= 5 ? 1 : 5 / (cards.length + 1)
            }))`,
            '--rotateZ': `rotateZ(${unit(idx) * 10}deg)`,
            '--translateY': `translateY(calc(${
              Math.sin(((unit(idx) * 10 + 90) / 180) * Math.PI) - 1
            }*var(--unit)))`,
          }}
        />
      ))}
    </div>
  );
}
