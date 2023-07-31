import React from 'react';
import './Header.css'
import {Link} from'react-router-dom';

function Header(props){
    return(
        <div className="header">
            <Link to='/Webmain'>
            <div className='logo'>
                로고
            </div>
            </Link>
            <Link to='/main'>
            <div className='game'>
                게임
            </div>
            </Link>
            <Link to='/CardFactory'>
            <div className='cardfactory'>
                카드 공방
            </div>
            </Link>
            <Link to='/CardMarket'>
            <div className='cardmarket'>
                카드 나눔터
            </div>
            </Link>
            <Link to='/Mypage'>
            <div className='mypage'>
                마이페이지
            </div>
            </Link>
            <Link to=''>
            <div className='logout'>
                로그아웃
            </div>
            </Link>
        </div>
    );
}

export default Header;