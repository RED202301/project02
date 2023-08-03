import { useState } from 'react';

function Card({ idx, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: '200px',
        height: '300px',
        backgroundColor: 'skyblue',
        boxSizing: 'border-box',
        border: idx === selected && 'solid tomato 5px',
      }}
    ></div>
  );
}

function User({ img, idx, total, radius, onClick, selected }) {
  const angle = (idx + 1) / (total + 1);
  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        width: '50vh',
        height: '50vh',
        transformStyle: 'preserve-3d',
        translate: `${radius * Math.cos(angle * Math.PI)}vh 45vh ${
          -radius * Math.sin(angle * Math.PI)
        }vh`,
        transform: `rotateY(${angle * 180 + 90}deg)`,
        backgroundColor: 'skyblue',
        backgroundImage: `url(${img})`,
        backgroundSize: `cover`,
        border: idx === selected && 'solid tomato 5px',
      }}
    ></div>
  );
}

function App() {
  const [selectedUser, selectUser] = useState(-1);
  const [selectedCard, selectCard] = useState(-1);
  const [myTurn, setMyTurn] = useState(true);
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
  // const users = [0, 0, 0, 0];
  const users = ['./카리나.webp', './윈터.webp', './지젤.webp', './닝닝.webp'];
  const cards = [0, 0, 0, 0];
  const [view, setView] = useState(1);
  const views = [
    `rotateY(-${180 / (users.length * 2)}deg)`,
    `rotateY(0deg)`,
    `rotateY(${180 / (users.length * 2)}deg)`,
  ];
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          perspective: '300vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            perspective: '300vh',
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
                width: '200vh',
                height: '200vh',
                borderRadius: '50%',
                backgroundColor: 'tomato',
                backgroundImage: 'url(./table.jpg)',
                translate: '0px 50vh 0vh',
                transformStyle: 'preserve-3d',
                transform: 'rotateX(90deg)',
              }}
            ></div>
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
          }}
          onClick={() => setView(view => view + 1)}
        >
          {'>'}
        </button>
      ) : (
        <></>
      )}

      <button
        style={{
          position: 'absolute',
          backgroundColor: 'greenyellow',
          textAlign: 'center',
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
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: '5px',
          display: 'flex',
          justifyContent: 'space-around',
          width: '100vw',
        }}
      >
        {cards.map((_, idx) => {
          return (
            <Card key={idx} idx={idx} selected={selectedCard} onClick={handleCardClick(idx)} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
