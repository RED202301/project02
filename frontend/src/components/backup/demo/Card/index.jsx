import Row from '../Flex/Row';
import styles from './Card.module.css';
import { useEffect, useRef, useState } from 'react';

export function Hand({ style, children }) {
  const [clicked, setClicked] = useState();
  function onClick() {
    setClicked(clicked => !clicked);
  }
  return (
    <Row style={style}>
      {/* <div className={styles.handcards}>{children}</div> */}

      {children.map((child, idx) => (
        <div
          className={`${styles.handcards} ${clicked ? styles.handcards : ''}`}
          onClick={onClick}
          key={idx}
        >
          {child}
        </div>
      ))}
    </Row>
  );
}

export function FlipCard({
  style,
  big,
  small,
  numOfStars,
  logo_img_url,
  main_img_url,
  background_img_urls,
  theme_color,
}) {
  const [clicked, setClicked] = useState(true);
  const ref = useRef();
  useEffect(() => {
    setClicked(false)
    ref.current.addEventListener('click', () => {
      setClicked(clicked => !clicked);
    });
  }, []);
  return (
    <div ref={ref} className={clicked ? `${styles.flip} ${styles.clicked}` : `${styles.flip}`}>
      <Card
        {...{
          style,
          big,
          small,
          numOfStars,
          logo_img_url,
          main_img_url,
          background_img_urls,
          theme_color,
        }}
      />
    </div>
  );
}

export function Card({
  style,
  big,
  small,
  numOfStars,
  logo_img_url,
  main_img_url,
  background_img_urls,
  theme_color,
}) {
  const front_background_img_url =
    background_img_urls?.length > 0 ? background_img_urls[0] : undefined;
  const back_background_img_url =
    background_img_urls?.length > 1 ? background_img_urls[1] : undefined;
  return (
    <div className={`${styles.card} ${styles.hand}`} style={{ ...style }}>
      <Front
        {...{
          big,
          small,
          numOfStars,
          logo_img_url,
          main_img_url,
          theme_color,
          background_img_url: front_background_img_url,
        }}
      />
      <Back {...{ theme_color, background_img_url: back_background_img_url }} />
    </div>
  );
}

export const theme_colors = {
  red: {
    mid: '#E36958',
    bot: '#EF8867',
  },
  orange: {
    mid: '#FEA652',
    bot: '#F7B556',
  },
  yellow: {
    mid: '#F9BB3B',
    bot: '#FADA6D',
  },
  green: {
    mid: '#ADBF24',
    bot: '#DED966',
  },
  cyan: {
    mid: '#66C8C8',
    bot: '#A1D9D2',
  },
  pink: {
    mid: '#F09F93',
    bot: '#F5C4BE',
  },
  blue: {
    mid: '#8BADD5',
    bot: '#B9C8E4',
  },
};

function Background({ children, background_img_url, theme_color }) {
  return background_img_url ? (
    <img className={styles.background} src={background_img_url} alt="" />
  ) : (
    <div className={styles.background}>
      <div className={styles.top}>{children}</div>
      <div className={styles.mid} style={{ backgroundColor: theme_colors[theme_color].mid }}></div>
      <div className={styles.bot} style={{ backgroundColor: theme_colors[theme_color].bot }}></div>
    </div>
  );
}

function Front({
  big,
  small,
  numOfStars,
  logo_img_url,
  main_img_url,
  background_img_url,
  theme_color,
}) {
  return (
    <div className={styles.front}>
      <Content {...{ big, small, numOfStars, logo_img_url, main_img_url, theme_color }} />
      <Background {...{ background_img_url, theme_color }} />
    </div>
  );
}

function Content({ big, small, numOfStars, logo_img_url, main_img_url, theme_color }) {
  return (
    <div className={styles.content}>
      <div className={styles.content_container}>
        {
          main_img_url
            ?<>
              <Header {...{ big, small, numOfStars, logo_img_url, theme_color }} />
              <img
              src={main_img_url}
              alt="메인 이미지"
              width="90%"
              height={`${90 - 10 * (Boolean(big) + Boolean(small))}%`}
              style={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
              />
            </>
            :
            <Row style={{
              width:"97%",
              height: "95%",
              borderRadius: "5%",
              backgroundColor:"white",
            }}>
              <Header {...{ big, small, numOfStars, theme_color }} style={{
                writingMode: "vertical-rl", transform: "scale(3)", color:'black'
              }} />
            </Row>
        }
      </div>
    </div>
  );
}

function Header({ style, big, small, numOfStars, logo_img_url, theme_color }) {
  let stars = '';
  for (let i = 0; i < numOfStars; i++) {
    stars += '⭐';
  }
  return (
    <div className={styles.header} style={{...style}}>
      <div className={styles.info}>
        {!big && small
          ? <div className={styles.big}>{small}</div>
          : <>
            <div className={styles.small} style={{color:theme_colors[theme_color].mid}}>{small}</div>
            <div className={styles.big}>{big}</div>
          </>
        }
        <div className={styles.stars}>{stars}</div>
      </div>
      {logo_img_url
        ? (
        <img
          src={logo_img_url}
          width={`${60 - 30 * !(Boolean(big) || Boolean(small))}`}
          height={`${40 - 20 * !(Boolean(big) || Boolean(small))}`}
          alt="로고 이미지"
          style={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        />
      ) : (
          <></>
      )}
    </div>
  );
}

function Back({ background_img_url, theme_color }) {
  return (
    <div className={styles.back}>
      <Background {...{ background_img_url, theme_color }}>
        <i>Ssafish!</i>
      </Background>
    </div>
  );
}
