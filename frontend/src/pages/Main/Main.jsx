import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './Main.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import useDidMountEffect from '../../components/useDidMountEffect';
import { useNavigate } from 'react-router-dom';
// import Cccc from './cccc'
import Sidebar from '../../components/Sidebar/Sidebar';

const base_URL = import.meta.env.VITE_SERVER_URL;
function Modal({ modal, setModal }) {
  // const host_URL= "http://192.168.30.193:5001"
  const host_URL = base_URL;
  // const [roomId, setRoomId] = useState(null);
  // const [pinNumber, setPIN] = useState('');

  const [roomName, setName] = useState('');
  const [timeLimit, setTimeLimit] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [gameType, setGameType] = useState('');
  const [deckId, setDeckId] = useState(1);
  const navigate = useNavigate();
  // useDidMountEffect(() => {
  //   console.log(name, timeLimit, capacity, gameType)

  // }, [name, timeLimit, capacity, gameType]);

  const Roomdata = () => {
    axios
      .post(host_URL + `/api/v1/room`, {
        roomName,
        timeLimit,
        capacity,
        gameType,
        deckId,
        userId: window.localStorage.getItem('userId'),
      })
      .then(response => {
        console.log(response.data);
        // setRoomId(response.data.roomId);
        // setPIN(response.data.pinNumber);
        const roomId = response.data.roomId;
        const pinNumber = response.data.pinNumber;

        window.sessionStorage.setItem('roomId', roomId);
        window.sessionStorage.setItem('pinNumber', pinNumber);
        window.sessionStorage.setItem('userId', window.localStorage.getItem('userId'));
        window.sessionStorage.setItem('nickname', window.localStorage.getItem('nickname'));
        if (roomId) {
          navigate('/GameRoom');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          className="modal"
          initial={{ opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
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
                <label htmlFor="name">방 제목</label>
                <input
                  type="text"
                  id="name"
                  placeholder="방 이름"
                  value={roomName}
                  onChange={e => setName(e.target.value)}
                  required
                />
                <label htmlFor="timeLimit">턴 시간 제한</label>
                <div className="form-capacity">
                  <div className="form-capacity2">
                    <label className="inputlabel" htmlFor="timeLimit1">
                      15초
                    </label>
                    <input
                      type="radio"
                      id="timeLimit1"
                      name="timeLimit"
                      value="15"
                      onChange={e => setTimeLimit(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-capacity2">
                    <label className="inputlabel" htmlFor="timeLimit2">
                      30초
                    </label>
                    <input
                      type="radio"
                      id="timeLimit2"
                      name="timeLimit"
                      value="30"
                      onChange={e => setTimeLimit(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-capacity2">
                    <label className="inputlabel" htmlFor="timeLimit3">
                      45초
                    </label>
                    <input
                      type="radio"
                      id="timeLimit3"
                      name="timeLimit"
                      value="45"
                      onChange={e => setTimeLimit(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-capacity2">
                    <label className="inputlabel" htmlFor="timeLimit4">
                      1초
                    </label>
                    <input
                      type="radio"
                      id="timeLimit4"
                      name="timeLimit"
                      value="1"
                      onChange={e => setTimeLimit(e.target.value)}
                    ></input>
                  </div>
                </div>

                <label htmlFor="capacity">정원</label>
                <div className="form-capacity">
                  <div className="form-capacity2">
                    <label className="inputlabel" htmlFor="capacity1">
                      2인
                    </label>
                    <input
                      type="radio"
                      id="capacity1"
                      name="capacity"
                      value="2"
                      onChange={e => setCapacity(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-capacity2">
                    <label className="inputlabel" htmlFor="capacity2">
                      3인
                    </label>
                    <input
                      type="radio"
                      id="capacity2"
                      name="capacity"
                      value="3"
                      onChange={e => setCapacity(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-capacity2">
                    <label className="inputlabel" htmlFor="capacity3">
                      4인
                    </label>
                    <input
                      type="radio"
                      id="capacity3"
                      name="capacity"
                      value="4"
                      onChange={e => setCapacity(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-capacity2">
                    <label className="inputlabel" htmlFor="capacity4">
                      5인
                    </label>
                    <input
                      type="radio"
                      id="capacity4"
                      name="capacity"
                      value="5"
                      onChange={e => setCapacity(e.target.value)}
                    ></input>
                  </div>
                </div>

                <label htmlFor="gameType">게임 유형</label>
                <input
                  type="text"
                  id="gameType"
                  placeholder="게임 유형"
                  value={gameType}
                  onChange={e => setGameType(e.target.value)}
                  required
                />

                <div className="form-deckId">
                  <label htmlFor="deckId">덱 선택</label>
                  <select onChange={e => setDeckId(e.target.value)}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </select>
                </div>

                <div className="form-submit-btn1">
                  <p className="form-submit-btn2" onClick={Roomdata}>
                    생성
                  </p>
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
      <div className="web">
        <div style={{ margin: '30px', marginBottom: '0px' }}>
          <Link to="/webmain" style={{ borderRadius: '7px', backgroundColor: '#D4A389' }}>
            웹페이지 GO
          </Link>
        </div>
        <div>
          <Sidebar></Sidebar>
        </div>
      </div>
      <div className="room">
        <Modal {...{ modal, setModal }} />
        <div className="enter" onClick={() => setModal(modal => !modal)}>
          {/* <div className='shine'> */}
          <div className="enter2">
            방 만들기
            {/* <div className='shine-effect'></div> */}
            {/* </div> */}
          </div>
        </div>
        {/* <div className="enter">
          <div className="enter2">
          <Link className="enter3" to="/RoomList">
              방들어가기
            </Link>
          </div>
        </div> */}
        {/* <Cccc web="lmen.us" twitter="lmenus" email="lmenus@lmen.us" tel="+44 7542 20 33 83" /> */}
      </div>
    </div>
  );
}

export default Main;
