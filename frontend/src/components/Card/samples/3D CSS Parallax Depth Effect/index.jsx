import { useEffect, useRef } from 'react';
import styles from './styles.module.scss'
import { useState } from 'react';


function Card({ title, img_url, className }) {
  const range = 40;
  const calcValue = (a, b) => (a / b * range - range / 2).toFixed(1);
  const [xValue, setXValue] = useState();
  const [yValue, setYValue] = useState();
  const [TO, setTO] = useState(null);
  /** @type {React.MutableRefObject<HTMLDivElement>} */
  const card = useRef();
  useEffect(() => {
    card.current.addEventListener('mousemove', ({ x, y }) => {
      if (TO) {
        window.cancelAnimationFrame(TO);
      }
      setTO(window.requestAnimationFrame(() => {
        setXValue(calcValue(x, window.innerWidth));
        setYValue(calcValue(y, window.innerHeight));
      }));
    });
  }, []);
  return (
    <>
      <div ref={card} className={`${styles.card} ${className}`}>
        <div className={`${styles.card__bg}`} style={{ backgroundPosition: `${xValue * .45}px ${-yValue * .45}px` }} />
        <img className={`${styles.card__img}`} style={{ transform: `translateX(${xValue}px) translateY(${yValue}px)` }} src={img_url} />
        <div className={`${styles.card__text}`}>
          <p className={`${styles.card__title}`}>{title}</p>
        </div>
      </div>
    </>
  );
}

export default function Sample() {
  return (
    <div className={`${styles.body}`}>
      <div className={`${styles.cards}`}>
        <h3>Movies</h3>
        <h1>Popular</h1>
        <Card title="Princess Mononoke" img_url="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_mono.png" className={styles.card__one} />
        <Card title="Spirited Away" img_url="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_chihiro.png" className={styles.card__two} />
        <Card title="Howl's Moving Castle" img_url="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_howlcastle.png" className={styles.card__three} />
      </div>
    </div>
  );
}