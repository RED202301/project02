import { useEffect, useRef, useState } from 'react';
import styles from './Card.module.scss';
/// <reference path="types.js" />

function toggleClassName(
  /** @type {EventTarget} */ targetElement,
  /** @type {String} */ targetClass
) {
  /** @type {string[]} */
  const classes = targetElement.className.split(' ');
  const targetIndex = classes.indexOf(targetClass);
  targetIndex === -1 ? classes.push(targetClass) : classes.splice(targetIndex, 1);
  targetElement.className = classes.join(' ');
}

function setClassName(
  /** @type {EventTarget} */ targetElement,
  /** @type {String} */ targetClass,
  /** @type {boolean} */ bool
) {
  /** @type {string[]} */
  const classes = targetElement.className.split(' ');
  const targetIndex = classes.indexOf(targetClass);
  if (targetIndex === -1) {
    if (bool) classes.push(targetClass);
  } else {
    if (!bool) classes.splice(targetIndex, 1);
  }
  targetElement.className = classes.join(' ');
}

export default function Card(
  /** @type {import('./typedefs').CardProps} */ {
    width,
    height,
    ratio,
    title,
    subtitle,
    img_url,
    bg_url,
    eventOptions,
  }
) {
  /** 카드 너비 / 카드 높이 @type {number} */
  const cardRatio = ratio || 3 / 2;
  const cardWidth = width || height * cardRatio;
  const cardHeight = height || width / cardRatio;

  const { tilting, filping, dragDropping, hovering } = eventOptions ? eventOptions : {};
  /** @type {React.MutableRefObject<HTMLDivElement>} */
  const CardWapperRef = useRef();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  let isDragging = false;
  let lastOffsetX = 0;
  let lastOffsetY = 0;

  function onMouseEnter(/** @type {MouseEvent} */) {}
  function onMouseMove(/** @type {MouseEvent} */ { offsetX, offsetY, clientX, clientY }) {
    const { offsetWidth, offsetHeight } = CardWapperRef.current;
    setRotateX((offsetX - offsetWidth / 2) / offsetWidth);
    setRotateY((offsetY - offsetHeight / 2) / offsetHeight);
    if (isDragging) {
      CardWapperRef.current.style.left = clientX - lastOffsetX + 'px';
      CardWapperRef.current.style.top = clientY - lastOffsetY + 'px';
    }
  }

  function onMouseLeave(/** @type {MouseEvent} */) {
    setRotateX(0);
    setRotateY(0);
  }
  function onMouseOver(/** @type {MouseEvent} */) {}
  function onMouseDown(/** @type {MouseEvent} */ { offsetX, offsetY }) {
    isDragging = true;
    lastOffsetX = offsetX;
    lastOffsetY = offsetY;
  }
  useEffect(() => {});
  function onMouseUp(/** @type {MouseEvent} */ { target }) {
    isDragging = false;
    setClassName(target, 'dragged', false);
  }
  function onClick(/** @type {MouseEvent} */ { target }) {
    toggleClassName(target, 'flipped');
  }

  useEffect(() => {
    CardWapperRef.current.addEventListener('mouseenter', onMouseEnter);
    CardWapperRef.current.addEventListener('mousemove', onMouseMove);
    CardWapperRef.current.addEventListener('mouseleave', onMouseLeave);
    CardWapperRef.current.addEventListener('mouseover', onMouseOver);
    CardWapperRef.current.addEventListener('mouseup', onMouseUp);
    CardWapperRef.current.addEventListener('mousedown', onMouseDown);
    CardWapperRef.current.addEventListener('click', onClick);
  }, []);

  return (
    <div
      ref={CardWapperRef}
      className={`${styles.card__wrap} ${(tilting && styles.tilting) || ''} ${
        (filping && styles.filping) || ''
      }  ${(dragDropping && styles.dragDropping) || ''} ${(hovering && styles.hovering) || ''}`}
      style={{
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        rotate: `${rotateY} ${-rotateX} 0 15deg`,
        // transform: `rotateY(${rotateX * 30}deg) rotateX(${rotateY * -30}deg)`,
      }}
    >
      <CardContent {...{ title, subtitle, img_url, bg_url, rotateX, rotateY }} />
    </div>
  );
}

function CardContent(
  /** @type {import('./typedefs').CardContentPros} */ {
    title,
    subtitle,
    img_url,
    bg_url,
    rotateX,
    rotateY,
  }
) {
  return (
    <div
      className={styles.card__content}
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: `url(${bg_url})`,
        backgroundPosition: `${rotateX * -10}px ${rotateY * -10}px`,
      }}
    >
      {/* <div
        className={styles.card__bg}
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(${bg_url})`,
          // translate: `${rotateX * -20}px ${rotateY * -20}px`,
          translate: `${rotateX * -40}px ${rotateY * -40}px`,
        }}
      /> */}
      <img
        className={styles.card__img}
        src={img_url}
        alt={title}
        style={{
          // translate: `${rotateX * 20}px ${rotateY * 20}px`,
          translate: `${rotateX * 5}px ${rotateY * 5}px`,
        }}
        draggable="false"
      />
      <div
        className={styles.card__subtitle}
        style={{
          // translate: `${rotateX * 40}px ${rotateY * 40}px`,
          translate: `${rotateX * 20}px ${rotateY * 20}px`,
        }}
      >
        {subtitle}
      </div>
      <div
        className={styles.card__title}
        style={{
          translate: `${rotateX * 20}px ${rotateY * 20}px`,
        }}
      >
        {title}
      </div>
    </div>
  );
}
