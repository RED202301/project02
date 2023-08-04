import { useRef, useEffect } from 'react';
import styles from './withDragging.module.scss';

export default function withDragging(Component) {
  return ({ ...props }) => {
    let isDragging = false;
    let lastOffsetX = 0;
    let lastOffsetY = 0;

    /** @type {React.MutableRefObject<HTMLDivElement>} */
    const DraggingRef = useRef();

    function onMouseDown(/** @type {MouseEvent} */ { offsetX, offsetY }) {
      console.log(1);
      isDragging = true;
      lastOffsetX = offsetX;
      lastOffsetY = offsetY;
    }
    function onMouseMove(/** @type {MouseEvent} */ { clientX, clientY }) {
      if (isDragging) {
        const left = clientX - lastOffsetX;
        const top = clientY - lastOffsetY;
        DraggingRef.current.style.left = (left > 0 ? left : 0) + 'px';
        DraggingRef.current.style.top = (top > 0 ? top : 0) + 'px';
      }
    }
    function onMouseUp(/** @type {MouseEvent} */) {
      isDragging = false;
    }

    useEffect(() => {
      DraggingRef.current.addEventListener('mousedown', onMouseDown);
      DraggingRef.current.addEventListener('mousemove', onMouseMove);
      DraggingRef.current.addEventListener('mouseup', onMouseUp);
    }, []);

    return (
      <div
        ref={DraggingRef}
        className={`${styles.withDragging}`}
        style={{ width: '100%', height: '100%' }}
      >
        <Component {...props} />
      </div>
    );
  };
}
