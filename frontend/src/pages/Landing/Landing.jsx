import './Landing.css';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const base_URL = import.meta.env.VITE_SERVER_URL;
function Landing() {
  // const host_URL = "http://192.168.30.193:5001"
  const host_URL = base_URL;
  const navigate = useNavigate();
  const REST_API_KEY = '0c75393f80241be4aaf8ebd811934887'; // RestAPI 키
  // const REDIRECT_URI = 'http://localhost:5173/login2'; // redirect 주소
  const REDIRECT_URI = base_URL + '/login2'; // redirect 주소
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;
  const [pinNumber, setPIN] = useState('');
  // const [roomId, setRoomId] = useState(null);
  const savePIN = event => {
    setPIN(event.target.value);
    // console.log(event.target.value);
  };

  //핀번호 입력창에 핀번호 입력하고 확인 버튼(get 요청)
  const buttonClick = () => {
    console.log({ pinNumber });
    axios
      .get(host_URL + `/api/v1/room/id/${pinNumber}`)
      .then(response => {
        console.log(response.data);
        // setRoomId(response.data.roomId);
        const roomId = response.data.roomId;
        // const pinNumber = response.data.pinNumber
        window.sessionStorage.setItem('roomId', roomId);
        // window.sessionStorage.setItem('pinNumber', pinNumber)

        //roomId를 받는데 성공했다면 닉네임 입력 창 띄워줌
        if (roomId) {
          Swal.fire({
            text: '닉네임을 입력 해 주세요',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: '등록',
            cancelButtonText: '취소',
          }).then(res => {
            // confirm 버튼을 눌렀다면 입력값을 가지고 post 요청
            if (res.isConfirmed) {
              console.log(res.value);
              axios
                .post(host_URL + '/api/v1/guest', {
                  nickname: res.value,
                })
                //요청이 성공했다면, userId, 닉네임 저장하고
                .then(response => {
                  console.log(response.data);
                  const userId = response.data.userId;
                  const nickname = response.data.nickname;
                  window.sessionStorage.setItem('userId', userId);
                  window.sessionStorage.setItem('nickname', nickname);
                  window.sessionStorage.setItem('pinNumber', pinNumber);
                  window.sessionStorage.setItem('roomId', roomId);
                  //userId가 저장됐다면, 방으로 입장 요청
                  if (userId) {
                    navigate('/GameRoom');
                  }
                })
                .catch(err => {
                  console.log(err);
                  Swal.fire({
                    icon: 'warning',
                    title: '닉네임 중복',
                    text: `닉네임을 다시 입력해주세요`,
                    confirmButtonText: '확인',
                  });
                });
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
        //실패 시, 접속 실패 창
        Swal.fire({
          icon: 'warning',
          title: '접속 실패',
          text: `핀번호를 다시 확인 해 주세요`,
          confirmButtonText: '확인',
        });
      });
  };
  return (
    <motion.div>
      <div className="Landing">
        <div className="Landing_div">
          <div className="LOGO">
            <h1>Ssafish!</h1>
          </div>
          <div className="PIN">
            <div className="container">
              <input
                required="게임 PIN"
                type="text"
                name="text"
                className="input"
                value={pinNumber}
                onChange={savePIN}
              />
              <label className="label">게임 PIN</label>
            </div>
            <Link to="">
              <button className="btn" onClick={buttonClick}>
                확인
              </button>
            </Link>
          </div>
          <br />
          <div className="LOGTUTO">
            <Link to={KAKAO_AUTH_URI}>
              <span className="span1">Login</span>
            </Link>
            <Link to="/Tutorial">
              <span className="span1">Tutorial</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Landing;
