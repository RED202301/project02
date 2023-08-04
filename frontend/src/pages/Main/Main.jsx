import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './Main.css';
import { Link } from 'react-router-dom';
import axios from "axios";
// import useDidMountEffect from '../../components/useDidMountEffect';
import {useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

function Modal({ modal, setModal }) {
  const host_URL= "http://192.168.30.103:5001"
  const [roomId, setRoomId] = useState(null);
  const [pinNumber, setPIN] = useState('');

  const [roomName, setName] = useState("");
  const [timeLimit, setTimeLimit] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [gameType, setGameType] = useState("");
  const navigate = useNavigate();
  // useDidMountEffect(() => {
  //   console.log(name, timeLimit, capacity, gameType)
      
  // }, [name, timeLimit, capacity, gameType]);

  const Roomdata = () => {
    axios
      .post(host_URL+`/api/v1/room`, {
        roomName,
        timeLimit,
        capacity,
        gameType,
      })
      .then((response) => {
        console.log(response.data);
        // setRoomId(response.data.roomId);
        // setPIN(response.data.pinNumber);
        const roomId = response.data.roomId
        const pinNumber = response.data.pinNumber

        window.sessionStorage.setItem('roomId', roomId)
        window.sessionStorage.setItem('pinNumber', pinNumber)
        if (roomId){
          Swal.fire({
            text: '닉네임을 입력 해 주세요',
            input:'text',
            showCancelButton: true,
            confirmButtonText: "등록",
            cancelButtonText: "취소",
             }).then((res) => {
              /* Read more about isConfirmed, isDenied below */
              if (res.isConfirmed) {
                console.log(res.value)
                axios.post(host_URL+"/api/v1/user",{
                nickname: res.value}
                )
                .then((response) => {
                  console.log(response.data)
                  const userId = response.data.userId
                  window.sessionStorage.setItem('userId', userId)
                  if (userId) {
                    navigate('/gameUI')
                  }
              }).catch((err)=>{console.log(err)})
            }})
        }
      })
      .catch((error) => {
        console.log(error);
      })};

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          className="modal"
          initial={{ y: 50, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: -50,
            opacity: 0,
          }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        >
            {/* ---모달 안------------------------------------- */}
            <div className="form-container">
            <form className="form">
              <div className="form-group">
              <p onClick={() => setModal(modal => !modal)} className="form-exit">
                &times;
              </p>
                <label htmlFor="name">방 이름</label>
                <input
                  type="text"
                  id="name"
                  placeholder="방 이름"
                  value={roomName}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label htmlFor="timeLimit">시간 제한</label>
                <div className='form-capacity'>
                  <label htmlFor="timeLimit1">15초</label>
                  <input type="radio" id="timeLimit1" name="timeLimit" value="15" onChange={(e) => setTimeLimit(e.target.value)}></input>
                  <label htmlFor="timeLimit2">30초</label>
                  <input type="radio" id="timeLimit2" name="timeLimit" value="30" onChange={(e) => setTimeLimit(e.target.value)}></input>
                  <label htmlFor="timeLimit3">45초</label>
                  <input type="radio" id="timeLimit3" name="timeLimit" value="45" onChange={(e) => setTimeLimit(e.target.value)}></input>
                  <label htmlFor="timeLimit4">60초</label>
                  <input type="radio" id="timeLimit4" name="timeLimit" value="60" onChange={(e) => setTimeLimit(e.target.value)}></input>
                </div>

                <label htmlFor="capacity">정원</label>
                <div className='form-capacity'>
                <label htmlFor="capacity1">2인</label>
                <input type="radio" id="capacity1" name="capacity" value="2" onChange={(e) => setCapacity(e.target.value)}></input>
                <label htmlFor="capacity2">3인</label>
                <input type="radio" id="capacity2" name="capacity" value="3" onChange={(e) => setCapacity(e.target.value)}></input>
                <label htmlFor="capacity3">4인</label>
                <input type="radio" id="capacity3" name="capacity" value="4" onChange={(e) => setCapacity(e.target.value)}></input>
                <label htmlFor="capacity4">5인</label>
                <input type="radio" id="capacity4" name="capacity" value="5" onChange={(e) => setCapacity(e.target.value)}></input>
                </div>

                <label htmlFor="gameType">게임 유형</label>
                  <input
                  type="text"
                  id="gameType"
                  placeholder="게임 유형"
                  value={gameType}
                  onChange={(e) => setGameType(e.target.value)}
                  required
                />
                <div className='form-submit-btn1'>
              <p className="form-submit-btn2" onClick={Roomdata}>방 생성</p>
                </div>
              </div>
            </form>
          </div>
            {/* ----------------------------------------------- */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Main() {
  const [modal, setModal] = React.useState(false);

  return (
    <div className="Main">
      {/* 메인 페이지 */}
      <div className="web">
        <Link to="/webmain">웹페이지</Link>
      </div>
      <div className="room">
        <Modal {...{ modal, setModal }} />
        <div className="enter" onClick={() => setModal(modal => !modal)}>
          <div className="enter2">방만들기</div>
        </div>
        <div className="enter">
          <div className="enter2">
          <Link className="enter3" to="/RoomList">
              방들어가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
