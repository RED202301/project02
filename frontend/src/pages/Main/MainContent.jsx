import React, {useState} from "react";
import './MainContent.scss'
// import CreateRoomModal from "../../components/CreateRoomModal";
import { Link, useNavigate } from 'react-router-dom';
import Logout from '../Login/Logout';
import Signout from '../Login/Signout';
import ChangeNickname from '../Login/ChangeNickname';
import axios from "axios";
import Swal from "sweetalert2";

const base_URL = import.meta.env.VITE_SERVER_URL;

const Card = () => {
    const navigate = useNavigate();
    const host_URL = base_URL;
    const [pinNumber, setPIN] = useState('');
    const savePIN = event => {
      setPIN(event.target.value);
      // console.log(event.target.value);
    };
    const buttonClick = () => {
        console.log({ pinNumber });
        axios
          .get(host_URL + `/api/v1/room/id/${pinNumber}`)
          .then(response => {
            console.log(response.data);
            // setRoomId(response.data.roomId);
            const roomId = response.data.roomId;
            const userId = window.localStorage.getItem('roomId')
            const nickname = window.localStorage.getItem('nickname')
            // const pinNumber = response.data.pinNumber
            window.sessionStorage.setItem('roomId', roomId);
            window.sessionStorage.setItem('userId', userId);
            window.sessionStorage.setItem('nickname', nickname);
            window.sessionStorage.setItem('pinNumber', pinNumber);
            if (roomId) {
                navigate('/GameRoom');
              }})
          .catch(res => {
            //실패 시, 접속 실패 창
            console.log(res);
            if (res.response.status == '403') {
                Swal.fire({
                  icon: 'warning',
                  iconColor: 'red',
                  title: '접속 실패',
                  text: `제한 인원을 초과하였습니다`,
                  confirmButtonText: '확인',
                  width: 'auto', 
                  // background: 'url(./src/assets/배경1.jpg)',
                  color: 'black',
                  confirmButtonColor: 'black',
                });
            }
            else {
              Swal.fire({
                icon: 'warning',
                iconColor: 'red',
                title: '접속 실패',
                text: `핀번호를 다시 확인 해 주세요`,
                confirmButtonText: '확인',
                width: 'auto', 
                // background: 'url(./src/assets/배경1.jpg)',
                color: 'black',
                confirmButtonColor: 'black',
              });
            }
          });
      };
  
  return (
    <div className="main">
    <div id="c2" className="card">
       <div className="card-info">
       <li className="contact-icon">
            <img src="src/assets/공방.svg" style={{'width':'5.5em',}} alt="" />
           </li>
           <div className="contact-title"><Link to="../cardfactory">카드 공방</Link></div>
               <div className="card-contact">
                <br></br>
                   <li className="icon-contact">
                       <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                       </svg>
                            + 원하시는 카드를
                   </li>
                   <li className="icon-contact">
                       <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                       </svg>
                           직접 만들어보세요!
                   </li>            
               </div>
           </div>
       </div>

       <div id="c3" className="card">
       <div className="card-info">
           <li className="address-icon">
           <img src="src/assets/게임기.svg" style={{'width':'5.5em',}} alt="" />
           </li>
           <div className="PIN_">
            <div className="PIN_container">
              <input
                required="게임 PIN"
                placeholder="게임 PIN"
                type="text"
                name="text"
                className="input_"
                value={pinNumber}
                onChange={savePIN}
              />
              {/* <label className="PIN_label">게임 PIN</label> */}
            </div>
            <Link to="">
              <button className="PIN_btn" onClick={buttonClick}>
                확인
              </button>
            </Link>
          </div>
     </div>
     <div className="card-social">
           <li id="cs1" className="card-social-icon" >
            <br></br>
            <br></br>
            <Signout></Signout>
            </li>
           </div>

   </div>


   <div id="c1" className="card">
        <div className="card-info">
           <div className="card-avatar">
                <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                   <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"></path>
               </svg>
           </div>
           <br></br>
           <div className="card-title">{window.localStorage.getItem('nickname')}
            </div>
           <br></br>
           <div className="card-subtitle">
            <Link to='/createroommodal'>
            방만들기
            </Link>
            </div>
            
           <div className="card-social">
           <li id="cs1" className="card-social-icon" onClick={ChangeNickname}>
                    <img src="src/assets/닉네임변경.svg" style={{'width':'3em'}} alt="" />
                    <p style={{'margin':'0px'}}>닉네임 변경</p>
               </li>
           <li id="cs2" className="card-social-icon" onClick={Logout}>
                    <img src="src/assets/로그아웃.svg"style={{'width':'3em'}} alt="z" />
                    <p style={{'margin':'0px'}}>로그아웃</p>
           </li>
           </div>
       </div>
   </div>
</div>
  );
};

export default Card;
