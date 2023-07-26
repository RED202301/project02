import { useRef } from 'react'
import styles from "./styles.module.scss"
import { useEffect } from 'react'
import { useState } from 'react'

function Card({img_url, children}) {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [mouseX, setMouseX] = useState(0)
    const [mouseY, setMouseY] = useState(0)
    const [mouseLeaveDelay, setMouseLeaveDelay] = useState(null)
    function handleMouseMove(e) {
        setMouseX(e.pageX - ref.current.offsetLeft - width/2)
        setMouseY(e.pageY - ref.current.offsetTop - height / 2)
        console.log("move", mouseX, mouseY)
    }
    function handleMouseEnter() {
        clearTimeout(mouseLeaveDelay);
        console.log("enter", mouseX, mouseY)
    }
    function handleMouseLeave() {
        setMouseLeaveDelay(setTimeout(() => {
            setMouseX(0);
            setMouseY(0);
        }, 1000));
        console.log("leave", mouseX, mouseY)
    }
    function mousePX() {
        return mouseX / width;
      }
    function mousePY() {
        return mouseY / height;
    }
    /**@type {React.MutableRefObject<HTMLDivElement>} */
    const ref = useRef()
    useEffect(() => {
        setWidth(ref.current.offsetWidth)
        setHeight(ref.current.offsetHeight)
    }, [])

    return (
        <div className={`${styles.body}`}>
            <div className={`${styles.card_wrap}`}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={ref}>
                <div className={`${styles.card}`} style={{transform: `rotateY(${mousePX() * 30}deg) rotateX(${mousePY() * -30}deg)`}}>
                    <div className={`${styles.card_bg}`} style={{transform: `translateX(${mousePX * -40}px) translateY(${mousePY * -40}px)`,backgroundImage: `url(${img_url})`}}/>
                    <div className={`${styles.card_info}`}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Sample() {
    return (
        <>
            <h1 className={styles.title}>Hover over the cards</h1>
            <div id="app" className={styles.container}>
            <Card img_url="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=">
                <h1 slot="header">Canyons</h1>
                <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </Card>
            <Card img_url="https://images.unsplash.com/photo-1479659929431-4342107adfc1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=">
                <h1 slot="header">Beaches</h1>
                <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </Card>
            <Card img_url="https://images.unsplash.com/photo-1479644025832-60dabb8be2a1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=">
                <h1 slot="header">Trees</h1>
                <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </Card>
            <Card img_url="https://images.unsplash.com/photo-1479621051492-5a6f9bd9e51a?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=">
                <h1 slot="header">Lakes</h1>
                <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </Card>
            </div>
        </>
    )
}





// Vue.config.devtools = true;

// Vue.component('card', {
//   template: ``,
//   mounted() {
//     this.width = this.$refs.card.offsetWidth;
//     this.height = this.$refs.card.offsetHeight;
//   },
//   props: ['img_url'],
//   computed: {
//     mousePX() {
//       return this.mouseX / this.width;
//     },
//     mousePY() {
//       return this.mouseY / this.height;
//     },
//     cardStyle() {
//       const rX = this.mousePX * 30;
//       const rY = this.mousePY * -30;
//       return {
//         transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`
//       };
//     },
//     cardBgTransform() {
//       const tX = this.mousePX * -40;
//       const tY = this.mousePY * -40;
//       return {
//         transform: `translateX(${mousePX * -40}px) translateY(${mousePY * -40}px)`
//       }
//     },
//     cardBgImage() {
//       return {
//         backgroundImage: `url(${this.img_url})`
//       }
//     }
//   },
//   methods: {
    
//   }
// });

// const app = new Vue({
//   el: '#app'
// });