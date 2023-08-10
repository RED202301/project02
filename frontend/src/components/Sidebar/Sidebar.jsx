import React,{useState} from 'react';
import './Sidebar.css'
import { Link } from 'react-router-dom';
import Logout from '../../pages/Login/Logout';
import Signout from '../../pages/Login/Signout';


const Sidebar = () => {

const [isOpen, setMenu] = useState(false);  // 메뉴의 초기값을 false로 설정

const toggleMenu = () => {
      setMenu(isOpen => !isOpen); // on,off 개념 boolean
  }

  return(
      <div className="Sidebar">
              <ul className="header-wrapper" style={{'display':'flex'}}>
                  {/* // 클릭되었을 때 준비한 함수 호출! on off 개념                      */}
                  <p onClick={()=>toggleMenu()} style={{'margin':'0px'}}>三🍔</p>  
                  안녕하세요, <Link to="/mypage">{window.localStorage.getItem('nickname')}</Link>님!
              </ul>

              <ul className={isOpen ? "show-menu" : "hide-menu"}> 
              {/* // 삼항연산자 true 일 때 클래스명 show-menu, false일때 hide-menu */}
                      <li ><Logout style={{'border':'solid',}}/></li>
                      <li ><Signout style={{'border':'solid',}}/></li>
                      <li ><Link to="../cardfactory">카드 공방</Link></li>
                      <li ><Link to="../resultmodal">게임 결과 모달 테스트</Link></li>
              </ul>
      </div>
  )




}

export default Sidebar
