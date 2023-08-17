import React, { useState, useEffect } from 'react';
// import useDidMountEffect from './useDidMountEffect';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './CreateRoomModal.scss';

const base_URL = import.meta.env.VITE_SERVER_URL;
function CreateRoomModal() {
  const host_URL = base_URL;
  const [roomName, setName] = useState('');
  const [timeLimit, setTimeLimit] = useState(0);
  const [capacity, setCapacity] = useState(0)
  const [gameType, setGameType] = useState('');
  const [deckId, setDeckId] = useState(1);
  // const [deck_list, setDecklist] = useState([]);
  const navigate = useNavigate();


  let deck_list = []
  for (let i = 0; i <= 1000; i++) {
    if (window.sessionStorage.getItem(`deck_${i}`)){
      deck_list.push(window.sessionStorage.getItem(`deck_${i}`))}
    }

  useEffect(()=>{
    axios.get(host_URL+`/api/deck/deckTitle`,)
    .then(response=> {
      console.log(response.data);
      for (let i = 0; i < response.data.length; i++) {
        window.sessionStorage.setItem(`deck_${i}`,response.data[i])
      }
      console.log(deck_list)
    }
    )
  },[])

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
    <div
          className="create_modal"
        >
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
                      60초
                    </label>
                    <input
                      type="radio"
                      id="timeLimit4"
                      name="timeLimit"
                      value="60"
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

                {/* <label htmlFor="gameType">게임 유형</label>
                <input
                  type="text"
                  id="gameType"
                  placeholder="게임 유형"
                  value={gameType}
                  onChange={e => setGameType(e.target.value)}
                  required
                /> */}

                <div className="form-deckId">
                  <label htmlFor="deckId" style={{'marginRight':'10px'}}>덱 선택</label>
                  <select onChange={e => setDeckId(e.target.value)}>
                  {deck_list.map((a, i) => (
                  <option value={i+1} key={i+1}>{a}</option>
                    ))}
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
        </div>
      )}

export default CreateRoomModal;