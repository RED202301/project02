// import { useEffect } from 'react';
import { useRef } from 'react';
import styles from './Card.module.scss';

function Background({ children }) {
  return (
    <div className={styles.Background}>
      <div className={styles.Top}>{children}</div>
      <div className={styles.Mid} />
      <div className={styles.Bot} />
    </div>
  );
}

function Content({ title, subtitle, points, img }) {
  let stars = '';
  for (let i = 0; i < points; i++) {
    stars += '⭐';
  }
  return (
    <div className={styles.Content}>
      <div className={styles.subtitle}>&nbsp;&nbsp;{subtitle}</div>
      <div className={styles.title}>&nbsp;&nbsp;{title}</div>
      <div className={styles.points}>&nbsp;{stars}</div>
      <div
        className={styles.img}
        // style={{ backgroundImage: `url('${img}')`, backgroundColor: 'black' }}
        style={{ backgroundImage: `url('${img}')` }}
        // style={{ backgroundImage: `url('${img}')`, border: 'solid 1px black' }}
      />
    </div>
  );
}

function Front({ title, subtitle, points, img }) {
  return (
    <div className={styles.Front}>
      <Background />
      <Content {...{ title, subtitle, points, img }} />
    </div>
  );
}

function Back() {
  return (
    <div className={styles.Back}>
      <Background>
        <i>SSAFISH!</i>
      </Background>
    </div>
  );
}

export default function Card({ title, subtitle, points, img, width, height, style }) {
  /** @type {React.MutableRefObject<HTMLDivElement>} */
  const CardRef = useRef();
  // useEffect(() => {
  //   CardRef.current.addEventListener('click', () => {
  //     CardRef.current.classList.toggle(styles.flipped);
  //   });
  // }, []);
  return (
    <div
      ref={CardRef}
      className={styles.Card}
      style={{ ...style, '--width': width, '--height': height }}
    >
      <Back />
      <Front {...{ title, subtitle, points, img }} />
    </div>
  );
}
