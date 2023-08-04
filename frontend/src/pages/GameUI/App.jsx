import { useState } from 'react';
import './App.css';

function Card({ idx, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: '10vw',
        height: '30vh',
        backgroundColor: 'skyblue',
        boxSizing: 'border-box',
        border: idx === selected && 'solid tomato 5px',
      }}
    ></div>
  );
}


// function CardCollection() {
//   return (
//     <div
//       style={{
//         width: '2vw',
//         height: '3vh',
//         border: 'solid black 2px',
//         backgroundColor: 'tomato'

//       }}>
//     </div>
//   );
// }
function Collectioncard({ idx, radius, total }) {
  const angle = (idx + 1) / (total+1) // Calculate the angle in degrees

  // const x = radius * Math.cos(angle * (Math.PI / 180));
  // const z = -radius * Math.sin(angle * (Math.PI / 180));

  return (
    <div
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: 'white',
        border:"solid black 2px",
        position: 'absolute',
        top: '45%', // Adjust the top position to center vertically
        left: '50%', // Adjust the left position to center horizontally
        translate: `${radius * Math.cos(angle * Math.PI) * 1.5}vw 45vw ${
          -radius * Math.sin(angle * Math.PI) * 1.5 
        }vw`,
        transform: `rotateY(${angle * 180 + 90}deg)`,
      }}
    />
  );
}

function User({ img, idx, total, radius, onClick, selected}) {
  const angle = (idx + 1) / (total + 1);
  const [point, setPoint] = useState(0);
  const username = "유저이름";
  const starcount = "🐬 X " + point;
  
  return (

    <div
      onClick={onClick}
      style={{

        position: 'relative',
        width: '50vh',
        height: '80vh',
        // marginTop: '15%',
        paddingLeft: '10%',
        marginBottom:'35%',
        paddingRight: '10%',
        

        transformStyle: 'preserve-3d',
        translate: `${radius * Math.cos(angle * Math.PI) * 1.5}vw 45vw ${
          -radius * Math.sin(angle * Math.PI )
        }vw`,
        transform: `rotateY(${angle * 180 + 90}deg)`,
        backgroundColor: 'skyblue',
        backgroundImage: `url(${img})`,
        backgroundSize: `cover`,
        border: idx === selected && 'solid tomato 5px',
      }}
    ><div style={{
      // border: 'solid white 2px',
      width: '180px',
      height: '50px',
      float: 'left',
      
    }}><p style={{
      transform: `rotateY(${angle * 180 + 90}deg)`,
      fontWeight: 'bold',
      fontSize: '15px',
      color: 'white',
    }}>{username}</p><p style={{
      transform: `rotateY(${angle * 180 + 90}deg)`,
      fontWeight: 'bold',
      fontSize: '15px',
      color: 'white',
    }}>수집한 물고기 : {starcount}</p></div>
      {/* <div style={{ width: '180px', height: '50px', float: 'left' }}>
        <p style={{ transform: `rotateY(${angle * 180 + 90}deg)`, fontWeight: 'bold', fontSize: '15px', color: 'white' }}>{username}</p>
        <p style={{ transform: `rotateY(${angle * 180 + 90}deg)`, fontWeight: 'bold', fontSize: '15px', color: 'white' }}>수집한 물고기 : {starcount}</p>
      </div> */}

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {Array.from({ length: 1 }, (_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '120px', // width 변경
              height: '120px', // height 변경
              backgroundColor: 'white',
              marginTop: '1000px',
              // zIndex: '1',
            }}
          />
        ))}
      </div>

=
    </div>

  );
}

function App() {
  const [selectedUser, selectUser] = useState(-1);
  const [selectedCard, selectCard] = useState(-1);
  const [myTurn, setMyTurn] = useState(true);
  // const [myMike, setMyMike] = useState(true);
  function handleUserClick(idx) {
    return function () {
      if (myTurn) selectUser(idx);
    };
  }
  function handleCardClick(idx) {
    return function () {
      if (myTurn) selectCard(idx);
    };
  }
  // fun
  // view시점이동
  // const users = [0, 0, 0, 0];
  const cardcols = [0, 1, 2, 3];
  const users = ['./카리나.webp', './윈터.webp', './지젤.webp', './닝닝.webp'];
  const cards = [0, 0, 0, 0, 0];
  // const collections = [0, 0, 0, 0, 0];
  const [view, setView] = useState(1);
  const views = [
    `rotateY(-${180 / (users.length * 0.7)}deg)`,
    `rotateY(-4deg)`,
    `rotateY(${180 / (users.length * 0.9)}deg)`,
  ];

  return (
    <div               
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      // borderRadius: '50%',
      backgroundColor: 'tomato',
      backgroundImage: 'url(./backs.png)',
      // translate: '0px 50vh 0vh',
      // transformStyle: 'preserve-3d',
      // transform: 'rotateX(90deg)',
      
    }}>
      <div
      style={{
        border: 'solid black 2px',
        height: '10px',
        marginTop: 10,
        marginLeft: '20%',
        marginRight: '20%',
        marginBottom: 10,

      }}><p style={{
        height: '10px',
        width: '50%',
        backgroundColor: 'whitesmoke',
      }}></p></div>
    <div
      style={{
        width: '70vw',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // float: 'center',
        marginLeft:'10%',
      }}
    >
      <div
        style={{
          perspective: '400vh',
        }}
      >

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            perspective: '400vh',
            transformStyle: 'preserve-3d',
            translate: '0vh -50vh 150vh',

          }}
        >
          <div
            style={{
              position: 'absolute',
              transformStyle: 'preserve-3d',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'all 1s',
              transform: views[view],
              

            }}
          >
            {users.map((img, idx, arr) => (
              <User
                img={img}
                idx={idx}
                total={arr.length}
                radius={100}
                key={idx}
                onClick={handleUserClick(idx)}
                selected={selectedUser}
                
              />
            ))}




            <div
              style={{
                position: 'absolute',
                marginTop: '5%',
                width: '100%',
                height: '200vh',
                borderRadius: '50%',
                backgroundColor: 'tomato',
                backgroundImage: 'url(./table.jpg)',
                translate: '0px 50vh 0vh',
                transformStyle: 'preserve-3d',
                transform: 'rotateX(90deg)',
                left: '4%',
                // zIndex: '2',
              }}
            > <div style={{
               width: '60vw', 
               height: '42vh',
               position: 'absolute', 
              //  display: 'flex', 
               top: 0 ,
  
              //  justifyContent: 'center',
              //  alignItems: 'center',
              //  transition: 'all 1s',
              //  transform: views[view],
               }}>
            {/* {cardcols.map((idx,index, arr) => (
              <Collectioncard
                idx={idx}
                key={idx}
                total = {arr.length}
                radius={100}
              />
            ))} */}
          </div>
              
            </div>

          </div>
        </div>

      </div>

      {view > 0 ? (
        <button
          style={{
            position: 'absolute',
            left: 0,
            backgroundColor: 'greenyellow',
          }}
          onClick={() => setView(view => view - 1)}
        >
          {'<'}
        </button>
      ) : (
        <></>
      )}

      {view < 2 ? (
        <button
          style={{
            position: 'absolute',
            right: 0,
            backgroundColor: 'greenyellow',
            // overflowY:'hidden',
          }}
          onClick={() => setView(view => view + 1)}
        >
          {'>'}
        </button>
      ) : (
        <></>
        )}

  {/* 턴 */}
      <button
        style={{
          position: 'absolute',
          backgroundColor: 'greenyellow',
          textAlign: 'center',
          float:'center'
        }}
        onClick={() => {
          if (myTurn) {
            selectUser(-1);
            selectCard(-1);
          }
          setMyTurn(myTurn => !myTurn);
        }}
      >
        {myTurn ? '내 턴 입니다' : '다른 사람 턴 입니다'}
      </button>
      {/* 카드배치 */}
      <div>
        <button 
          style={{
          position: 'absolute',
          width: 40,
          left: 0,
          fontSize: '3px',
          bottom: 300,
          backgroundColor: 'greenyellow',
          // float: 'left'
          
        }}>나가기
          </button>
          </div>
      <div>
        <button 
          style={{
          position: 'absolute',
          width: 30,
          left: 70,
          fontSize: '3px',
          bottom: 300,
          backgroundColor: 'greenyellow',
          // float: 'left'
        }}
        onClick={() => {

          setMyTurn(myTurn => !myTurn);
        }}>
          {myTurn ? '❚❚' : '▷'}</button>
          </div>
        <div>
        <button 
          style={{
          position: 'absolute',
          width: 30,
          left: 40,
          bottom: 300,
          // float: 'left',
          fontSize: '3px',
 
          backgroundColor: 'greenyellow',
        }}
        onClick={() => {

          setMyTurn(myTurn => !myTurn);
        }}>
          {myTurn ? '🔈' : '🔊'}</button>
        </div>
        {/* <div
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          top: '70%',
          left: '50%',
          marginLeft: '-100px', // 가로 중앙 정렬
          backgroundColor: 'white',
        }}
      ></div> */}
      <div
        style={{
          position: 'absolute',
 
          left: '38%',
          bottom: 0,
          display: 'flex',
          justifyContent: 'space-around',
          width: '60vw',
          height: '42vh',
          
        }}
      >
        {cards.map((_, idx) => {
          return (
            <Card key={idx} idx={idx} selected={selectedCard} onClick={handleCardClick(idx)}> </Card>
            );
          })}

      </div>
    </div>
    </div>
  );
}

export default App;