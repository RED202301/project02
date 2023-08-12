import Card from './Card/Card';
import styles from './CardsOnHand.module.scss';
/** @typedef {import('./Card/Card').Card} Card */

export default function CardsOnHand(
  /** @type {{cards:Card[]}} */ {
    cards,
    flipped,
    setSelectedCard,
    selectedCard,
    me,
    currentPhase,
    setCurrentPhase,
  }
) {
  // const card_info = {
  //   cardId: 1,
  //   mainTitle: '카리나',
  //   subTitle: '에스파',
  //   mainImgUrl: './카리나.webp',
  //   point: 3,
  // };
  // cards = [
  //   card_info,
  //   card_info,
  //   card_info,
  //   card_info,
  //   card_info,
  //   card_info,
  //   // card_info,
  // ];
  function unit(idx) {
    const centerIdx = (cards.length - 1) / 2;
    return idx - centerIdx;
  }
  return (
    <div className={`${styles.CardsOnHand}`}>
      {cards.map(({ cardId, mainTitle, subTitle, mainImgUrl, point }, idx) => (
        <div
          onClick={() => {
            // console.log(me, cardId, currentPhase);
            if (me) {
              setCurrentPhase(currentPhase => {
                if (currentPhase === 'SELECT_CARD_TURN') {
                  setSelectedCard(cardId);
                }
                return currentPhase;
              });
            }
          }}
          key={idx}
          style={{ position: 'absolute', bottom: 'calc(var(--unit)*0.24)', pointerEvents: 'auto' }}
        >
          <Card
            {...{ cardId, mainTitle, subTitle, mainImgUrl, point, flipped }}
            isOnHand={true}
            width={'calc(var(--unit)*0.16)'}
            height={'calc(var(--unit)*0.24)'}
            style={{
              boxSizing: 'borderBox',
              border: me && selectedCard == cardId ? 'solid 5px white' : '',

              position: 'absolute',
              transformOrigin: 'bottom',
              '--translateX': `translateX(calc(${unit(idx)}*var(--unit)*0.2*${
                cards.length <= 4 ? 0.6 : 4 / (cards.length + 1)
              }))`,
              '--rotateZ': `rotateZ(${
                unit(idx) * 10 * (cards.length <= 4 ? 1 : 4 / (cards.length + 1))
              }deg)`,
              '--translateY': `translateY(
              calc(
                ${1 - Math.sin(((unit(idx) * 10 + 90) / 180) * Math.PI)}
                *var(--unit)
                *${cards.length <= 4 ? 1 : 4 / (cards.length + 1)}
                -
                ${1 - Math.sin(((unit(0) * 10 + 90) / 180) * Math.PI)}
                *var(--unit)
                *${cards.length <= 4 ? 1 : 4 / (cards.length + 1)}
              )
            )`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
