// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './WebMain.css';
// import axios from 'axios';

// function WebMain() {
//   const [deckres, setDeckRes] = useState('');
//   const [isDoorOpen, setIsDoorOpen] = useState(false);
//   const [isPageRedirected, setIsPageRedirected] = useState(false);

//   const handleCardFactoryClick = () => {
//     // ...
//   };

//   useEffect(() => {
//     fetchDeckData();
//   }, []);

//   function fetchDeckData() {
//     axios.get(`https://i9e202.p.ssafy.io/api/deck/1`)
//       .then(response => {
//         console.log('GET 요청 성공:', response.data);
//         setDeckRes(response.data);
//       })
//       .catch(error => {
//         console.error('GET 요청 실패:', error);
//       });
//   }

//   const renderCardDecks = () => {
//     const decks = deckres.cardList || [];
//     const decksPerPage = 5;
//     const pages = Math.ceil(decks.length / decksPerPage);

//     const renderedDecks = [];

//     for (let page = 0; page < 4; page++) {
//       const startIndex = page * decksPerPage;
//       const endIndex = startIndex + decksPerPage;
//       const pageDecks = decks.slice(startIndex, endIndex);

//       const pageDeckElements = pageDecks.map((data, deckIndex) => (
//         <div className='carddeck' key={startIndex + deckIndex} style={{display:'flex'}}>
//         <div className='card-info'>
//           <p className='main-title' style={{width:'100px',zIndex:'1', marginLeft:'-20px'}}>{data.mainTitle}</p>
//           <p className='sub-title' style={{zIndex:'1', width:'100px', marginLeft:'-15px' }}>{data.subTitle}</p>
//           <img src={data.mainImgUrl} style={{zIndex:'1'}} alt='' className='card-img' />
//         </div>
//       </div>
//       ));

//       renderedDecks.push(
//         <div key={page} style={{ display: 'flex' }}>
//           {pageDeckElements}
//         </div>
//       );
//     }

//     return renderedDecks;
//   };

//   return (
//     <div className="WebMain">
//         <div>웹 메인 페이지</div>

//       <div className='grids'>
//         {renderCardDecks()}

//         <div style={{ marginLeft: '130%', marginTop: '50%' }}>
//           <div
//             className={`webbox boxlayout1 ${isDoorOpen ? 'open' : ''}`}
//             onClick={handleCardFactoryClick}
//           >
//             <div className='cardfactory'>
//               카드 공방<span style={{ marginLeft: '10px' }}>@</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './WebMain.css';
import axios from 'axios';
function WebMain() {
  const [deckres, setDeckRes] = useState(null);
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [isPageRedirected, setIsPageRedirected] = useState(false);

  const handleCardFactoryClick = () => {
    if (isPageRedirected) {
      return; // 이미 페이지로 이동한 경우에는 클릭 처리를 막음
    }

    setIsDoorOpen(true);

    setTimeout(() => {
// 문을 닫기 위해 상태 변경
      setIsPageRedirected(true); // 페이지 이동을 위해 상태 변경

      setTimeout(() => {
        // 게임공방 페이지로 이동
        window.location.href = '/CardFactory';
      }, 900)}); // 2초 후에 페이지 이동


    }
    useEffect(() => {
      fetchDeckData();
    }, []);
    function fetchDeckData() {
      axios.get(`https://i9e202.p.ssafy.io/api/deck/1`)
      .then(response => {
        console.log('GET 요청 성공:', response.data);
        setDeckRes(response.data);
      })
      .catch(error => {
        console.error('GET 요청 실패:', error);
      });
    }
    console.log(deckres)
  return (
    <div className="WebMain">
      <div>
        {/* <div className='flower-nav'>웹 메인 페이지</div> */}

        <div style={{ marginLeft:'130%', marginTop:'50%' }}>
          <div
            className={`webbox boxlayout1 ${isDoorOpen ? 'open' : ''}`}
            onClick={handleCardFactoryClick}
          >
            <div className='cardfactory'>
         
            </div>
          </div>
          {/* Other links */}
        </div>
      </div>
    </div>
  );
}


export default WebMain;
