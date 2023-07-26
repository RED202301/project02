import { useRef } from 'react';
import styles from './styles.module.scss'


function Card({title, img_url, className}) {
  const images = useRef()
  const backgrounds = useRef()
  return (
    <>
      <div className={`${styles.card} ${className}`}>
        <div ref={backgrounds} className={`${styles.card__bg}` style={{backgroundPosition:`${xValue*.45}px ${-yValue*.45}px`}} />
        <img ref={images} className={`${styles.card__img}`} style={{transform: `translateX(${-xValue}px) translateY(${yValue}px)`}} src={ img_url } />
        <div className={`${styles.card__text}`}>
          <p className={`${styles.card__title}`}>{ title }</p>
        </div>
      </div>
    </>
  )
}

export default function Sample() {
  const cards = useRef()
  let timeout;
  const range = 40;
  const calcValue = (a, b) => (a/b*range-range/2).toFixed(1) // thanks @alice-mx
  document.addEventListener('mousemove', ({x, y}) => {
    if (timeout) {
    window.cancelAnimationFrame(timeout);
    }
    timeout = window.requestAnimationFrame(() => {
    const yValue = calcValue(y, window.innerHeight);
    const xValue = calcValue(x, window.innerWidth);
  
    cards.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;
  
    [].forEach.call(images, (image) => {
      image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
    });
  
    [].forEach.call(backgrounds, (background) => {
      background.style.backgroundPosition = `${xValue*.45}px ${-yValue*.45}px`;
    })
    })
  }, false);


  return (
    <div className={`${styles.body}`}>
      <div ref={cards} className={`${styles.cards}`}>
        <h3>Movies</h3>
        <h1>Popular</h1>
        <Card title="Princess Mononoke" img_url="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_mono.png" className={styles.card__one}/>
        <Card title="Spirited Away" img_url="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_chihiro.png" className={styles.card__two}/>
        <Card title="Howl's Moving Castle" img_url="https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_howlcastle.png" className={styles.card__three}/>
      </div>
    </div>
  )
}