import { useRef } from 'react';
import styles from './Card.module.scss';
// import { useEffect } from 'react';
import { useState } from 'react';

// function Inner({ children }) {
//   return <div className={styles.Inner}>{children}</div>;
// }

function Background({ img, coordX, coordY }) {
  const offsetX = coordX * 3;
  const offsetY = coordY * 3;

  return (
    <div
      className={styles.Background}
      style={{
        backgroundImage: `url(${img})`,
        backgroundColor: `tomato`,
        '--offsetX': offsetX,
        '--offsetY': offsetY,
      }}
    />
  );
}
function Subject({ img, coordX, coordY }) {
  const offsetX = coordX * 2;
  const offsetY = coordY * 2;
  return (
    <div
      className={styles.Subject}
      style={{
        backgroundImage: `url(${img})`,
        // backgroundColor: `skyblue`,
        '--offsetX': offsetX,
        '--offsetY': offsetY,
      }}
    />
  );
}
function Foreground({ img, coordX, coordY }) {
  const offsetX = coordX;
  const offsetY = coordY;
  return (
    <div
      className={styles.Foreground}
      style={{
        backgroundImage: `url(${img})`,
        backgroundColor: `yellowgreen`,
        '--offsetX': offsetX,
        '--offsetY': offsetY,
      }}
    />
  );
}

function CardSubTitle({ subtitle }) {
  return (
    <div className={styles.subtitleWrapper}>
      <div className={styles.subtitle}>{subtitle}</div>
    </div>
  );
}

function CardTitle({ title }) {
  return (
    <div className={styles.titleWrapper}>
      <div className={styles.title}>{title}</div>
    </div>
  );
}

export default function Card({ width, height, title, subtitle, subject, background }) {
  /** @type {React.MutableRefObject<HTMLDivElement>} */
  const CardRef = useRef();
  // const [coordX, setCoordX] = useState(0);
  // const [coordY, setCoordY] = useState(0);
  const coordX = useState(0)[0];
  const coordY = useState(0)[0];

  // function handleMouseMove(/** @type {MouseEvent} */ event) {
  //   const { offsetWidth, offsetHeight } = CardRef.current;
  //   const { offsetX, offsetY } = event;
  //   const coordX = (offsetX - offsetWidth / 2) / offsetWidth;
  //   const coordY = (offsetY - offsetHeight / 2) / offsetHeight;
  //   setCoordX(coordX);
  //   setCoordY(coordY);
  //   console.log(event.target);
  // }

  // function handleMouseLeave() {
  //   setCoordX(0);
  //   setCoordY(0);
  // }

  // useEffect(() => {
  //   CardRef.current.addEventListener('mousemove', handleMouseMove);
  //   CardRef.current.addEventListener('mouseleave', handleMouseLeave);
  // }, []);

  return (
    <div
      ref={CardRef}
      className={styles.Card}
      style={{
        '--width': width,
        '--height': height,
        '--title-length': title.length,
        '--subtitle-length': subtitle.length,
        transform: `rotateX(${-coordY * 20}deg) rotateY(${coordX * 20}deg)`,
      }}
    >
      <Background {...{ coordX, coordY }} img={background} />
      <Subject {...{ coordX, coordY }} img={subject} />
      {/* <Foreground {...{ coordX, coordY }} /> */}
      <CardSubTitle subtitle={subtitle} />
      <CardTitle title={title} />
    </div>
  );
}
