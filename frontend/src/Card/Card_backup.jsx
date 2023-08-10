import Row from '../Flex/Row';
import styles from './Card.module.scss';
import { useEffect, useRef, useState } from 'react';

export default function FlipCard({
  style,
  title,
  subtitle,
  numOfStars,
  main_img_url,
  theme_color,
}) {
  const [clicked, setClicked] = useState(true);
  const ref = useRef();
  useEffect(() => {
    setClicked(false);
    ref.current.addEventListener('click', () => {
      setClicked(clicked => !clicked);
    });
  }, []);
  return (
    <div ref={ref} className={clicked ? `${styles.flip} ${styles.clicked}` : `${styles.flip}`}>
      <Card
        {...{
          style,
          title,
          subtitle,
          numOfStars,
          main_img_url,
          theme_color,
        }}
      />
    </div>
  );
}

export function Card({ style, title, subtitle, numOfStars, main_img_url, theme_color }) {
  return (
    <div className={`${styles.card} ${styles.hand}`} style={{ ...style }}>
      <Front
        {...{
          title,
          subtitle,
          numOfStars,
          main_img_url,
          theme_color,
        }}
      />
      <Back {...{ theme_color }} />
    </div>
  );
}

const theme_colors = {
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

function Background({ children, theme_color }) {
  return (
    <div className={styles.background}>
      <div className={styles.top}>{children}</div>
      <div className={styles.mid} style={{ backgroundColor: theme_colors[theme_color].mid }}></div>
      <div className={styles.bot} style={{ backgroundColor: theme_colors[theme_color].bot }}></div>
    </div>
  );
}

function Front({ title, subtitle, numOfStars, main_img_url, theme_color }) {
  return (
    <div className={styles.front}>
      <Content {...{ title, subtitle, numOfStars, main_img_url, theme_color }} />
      <Background {...{ theme_color }} />
    </div>
  );
}

function Content({ title, subtitle, numOfStars, main_img_url, theme_color }) {
  return (
    <div className={styles.content}>
      <div className={styles.content_container}>
        {main_img_url ? (
          <>
            <Header {...{ title, subtitle, numOfStars, theme_color }} />
            <div
              style={{
                backgroundImage: `url(${main_img_url})`,
                backgroundSize: 'cover',
                width: '90%',
                height: `${90 - 10 * (Boolean(title) + Boolean(subtitle))}%`,
              }}
            />
          </>
        ) : (
          <Row
            style={{
              width: '97%',
              height: '95%',
              borderRadius: '5%',
              backgroundColor: 'white',
            }}
          >
            <Header
              {...{ title, subtitle, numOfStars, theme_color }}
              style={{
                writingMode: 'vertical-rl',
                transform: 'scale(3)',
                color: 'black',
              }}
            />
          </Row>
        )}
      </div>
    </div>
  );
}

function Header({ style, title, subtitle, numOfStars, theme_color }) {
  let stars = '';
  for (let i = 0; i < numOfStars; i++) {
    stars += '⭐';
  }
  return (
    <div className={styles.header} style={{ ...style }}>
      <div className={styles.info}>
        {!title && subtitle ? (
          <div className={styles.title}>{subtitle}</div>
        ) : (
          <>
            <div className={styles.subtitle} style={{ color: theme_colors[theme_color].mid }}>
              {subtitle}
            </div>
            <div className={styles.title}>{title}</div>
          </>
        )}
        <div className={styles.stars}>{stars}</div>
      </div>
    </div>
  );
}

function Back({ theme_color }) {
  return (
    <div className={styles.back}>
      <Background {...{ theme_color }}>
        <i>Ssafish!</i>
      </Background>
    </div>
  );
}
