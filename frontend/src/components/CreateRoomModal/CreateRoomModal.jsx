import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
// import useDidMountEffect from './useDidMountEffect';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './CreateRoomModal.scss';

const base_URL = import.meta.env.VITE_SERVER_URL;
function CreateRoomModal() {
  const [modal, setModal] = React.useState(true);
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
        >
          {/* ---모달 안------------------------------------- */}
          <div className="form-container">
            <form className="form">
              <div className="form-group">
                <p className="form-exit"><Link to='/main'>
                  &times;
                </Link>
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
                      5초
                    </label>
                    <input
                      type="radio"
                      id="timeLimit1"
                      name="timeLimit"
                      value="5"
                      onChange={e => setTimeLimit(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-capacity2">
                    <label className="inputlabel" htmlFor="timeLimit2">
                      15초
                    </label>
                    <input
                      type="radio"
                      id="timeLimit2"
                      name="timeLimit"
                      value="15"
                      onChange={e => setTimeLimit(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-capacity2">
                    <label className="inputlabel" htmlFor="timeLimit3">
                      30초
                    </label>
                    <input
                      type="radio"
                      id="timeLimit3"
                      name="timeLimit"
                      value="30"
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

export default CreateRoomModal;