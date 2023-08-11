import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './WebMain.css';

function WebMain() {
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

  return (
    <div className="WebMain">
      <div style={{ display: 'grid' }}>
        <div>웹 메인 페이지</div>
        <div style={{ display: 'flex' }}>
          <div
            className={`webbox boxlayout1 ${isDoorOpen ? 'open' : ''}`}
            onClick={handleCardFactoryClick}
          >
            <div className='cardfactory'>
              카드 공방<span style={{ marginLeft: '10px' }}>@</span>
            </div>
          </div>
          {/* Other links */}
        </div>
      </div>
    </div>
  );
}

export default WebMain;
