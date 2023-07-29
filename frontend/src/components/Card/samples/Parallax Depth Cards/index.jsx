import { useState, useRef, useEffect } from 'react'
import styles from "./styles.module.scss"

function Card({img_url, children}) {
  /**@type {React.MutableRefObject<HTMLDivElement>} */
  const ref = useRef();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [mouseLeaveDelay, setMouseLeaveDelay] = useState(null);
  
  useEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  }, []);

  function handleMouseEnter() {
    clearTimeout(mouseLeaveDelay);
    console.log("enter");
    console.log("offsetWidth", width, "offsetHeight", height);
  }
  
  function handleMouseMove(e) {
    setMouseX(e.pageX - ref.current.offsetLeft - width / 2);
    setMouseY(e.pageY - ref.current.offsetTop - height / 2);
    console.log("move", mouseX, mouseY, "pageX", e.pageX, "pageY", e.pageY);
  }
  
  function handleMouseLeave() {
    setMouseLeaveDelay(setTimeout(() => {
      setMouseX(0);
      setMouseY(0);
    }, 1000));
    console.log("leave");
  }

  function mousePX() {
    return mouseX / width;
  }
  
  function mousePY() {
    return mouseY / height;
  }

  return (
    <div className={`${styles.body}`}>
      <div className={`${styles.card_wrap}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={ref}>
        {/* 마우스 방향으로 기울어짐 */}
        <div
          className={`${styles.card}`}
          style={{ transform: `rotateY(${mousePX() * 30}deg) rotateX(${mousePY() * -30}deg)` }}>
          {/* 마우스 반대로 움직임 */}
          <div
            className={`${styles.card_bg}`}
            style={{
              transform: `translateX(${mousePX() * -40}px) translateY(${mousePY() * -40}px)`,
              backgroundImage: `url(${img_url})`
            }} />
          <div
            className={`${styles.card_bg}`}
            style={{
              transform: `translateX(${mousePX() * 40}px) translateY(${mousePY() * 40 + 50}px)`,
              // backgroundImage: `url("./public/person.jpg")`,
              // backgroundImage: `url("./public/winter.png")`,
              // backgroundImage: `url("./public/아이.webp")`,
              // backgroundImage: `url("./public/student.jpeg")`,
              width: "80%",
              height: "80%",
            }} />
          
            
          <div className={`${styles.card_info}`}>
            {children}
          </div>
        </div>
        <img
          className={`${styles.card_bg}`}
          src=".\public\butterfly.jpg" alt=""
          // src="./public/아이.webp" alt=""
          // src=".\public\landmark.webp" alt=""
          style={{
            // width: '100%',
            height: '100%',
            transform: `translateX(${mousePX() * 40}px) translateY(${mousePY() * 40}px) rotateY(${mousePX() * 30}deg) rotateX(${mousePY() * -30}deg)`
          }}
        />
      </div>
    </div>
  );
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
  );
}