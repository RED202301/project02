import { useEffect, useRef } from 'react'
import styles from './Card.module.scss'

export default function Card() {
    
    /** @type {React.MutableRefObject<HTMLElement>} */
    const ref = useRef();
    useEffect(() => {
        let dragged = false;
        let x = 0;
        let y = 0;
        ref.current.addEventListener('mousedown', (event) => {
            dragged = true;
            x = event.x
            y = event.y
        })
        ref.current.addEventListener('mousemove', (event) => {
            if (dragged) {
                console.log(event.x-x, event.y-y)
                // event.target.style.top = `${event.clientY}px`
                // event.target.style.left = `${event.clientX}px`
            }
        })
        ref.current.addEventListener('mouseup', () => {
            dragged = false;
        })
    }, [])

    return (
        <div ref={ref} className={styles.Card}>
        </div>
    )
}