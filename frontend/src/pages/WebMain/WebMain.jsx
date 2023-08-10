import React from 'react';
import './WebMain.css';
import { Link } from 'react-router-dom';

function WebMain() {
  return (
    <div className="WebMain">
      <div>
      <div>웹 메인 페이지</div>
      <div style={{ display: 'flex' }}>
        <Link to='/CardFactory' className='webbox boxlayout1' >
          <div className='cardfactory'>
            카드 공방
          </div>
        </Link>
        {/* <Link to='/CardMarket' className='webbox boxlayout2'>
          <div className='cardmarket'>
            카드 나눔터
          </div>
        </Link> */}
        <Link to='/Mypage' className='webbox'>
          <div className='mypage'>
            마이페이지
          </div>
        </Link>
      </div>
    </div>
    </div>
  );
}

export default WebMain;
