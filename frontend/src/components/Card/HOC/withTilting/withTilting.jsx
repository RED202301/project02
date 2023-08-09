import { useRef, useState, useEffect } from 'react';
import styles from './withTilting.module.scss';

export default function withTilting(Component) {
  return ({ ...props }) => {
    /** @type {React.MutableRefObject<HTMLDivElement>} */
    const TiltingRef = useRef();
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    function onMouseMove(/** @type {MouseEvent} */ { offsetX, offsetY }) {
      const { offsetWidth, offsetHeight } = TiltingRef.current;
      setRotateX((offsetX - offsetWidth / 2) / offsetWidth);
      setRotateY((offsetY - offsetHeight / 2) / offsetHeight);
    }

    function onMouseLeave(/** @type {MouseEvent} */) {
      setRotateX(0);
      setRotateY(0);
    }

    useEffect(() => {
      TiltingRef.current.addEventListener('mousemove', onMouseMove);
      TiltingRef.current.addEventListener('mouseleave', onMouseLeave);
    }, []);

    return (
      <div
        ref={TiltingRef}
        className={`${styles.withTilting}`}
        style={{ width: '100%', height: '100%', rotate: `${rotateY} ${-rotateX} 0 15deg` }}
      >
        <Component {...{ ...props, rotateX, rotateY }} />
      </div>
    );
  };
}
