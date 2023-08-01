import { useState } from 'react';
import Websocket from './Websocket/Websocket';

const host_URL = 'http://192.168.30.103:5000';

function RoomCreate() {
  const [name, setName] = useState('');
  const [timeLimit, setTimeLimit] = useState(45);
  const [capacity, setCapacity] = useState(5);
  const [gameType, setGameType] = useState('GoFish');

  const [roomId, setRoomId] = useState('');
  const [pinNumber, setPinNumber] = useState('');

  /** @param {SubmitEvent} e */
  function handleSubmit(e) {
    e.preventDefault();

    const request_url = host_URL + '/api/v1/room';
    console.log(request_url);

    fetch(request_url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        timeLimit,
        capacity,
        gameType,
      }),
    })
      .then(res => res.json())
      .then(({ roomId, pinNumber }) => {
        setRoomId(roomId);
        setPinNumber(pinNumber);
      });

    setName('');
  }

  return (
    <div>
      <h2>게임방 개설</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input__name">방제목</label>
        <input type="text" id="input__name" value={name} onChange={e => setName(e.target.value)} />
        <br />
        <label htmlFor="input__timeLimit">턴 당 시간제한</label>
        <select
          id="input__timeLimit"
          value={timeLimit}
          onChange={e => setTimeLimit(e.target.value)}
        >
          <option value={15}>15초</option>
          <option value={30}>30초</option>
          <option value={45}>45초</option>
          <option value={60}>60초</option>
        </select>
        <br />
        <label htmlFor="input__capacity">인원 수 제한</label>
        <select id="input__capacity" value={capacity} onChange={e => setCapacity(e.target.value)}>
          <option value={2}>2명</option>
          <option value={3}>3명</option>
          <option value={4}>4명</option>
          <option value={5}>5명</option>
        </select>
        <br />
        <label htmlFor="input__gameType">게임 종류</label>
        <select id="input__gameType" value={gameType} onChange={e => setGameType(e.target.value)}>
          <option value={'GoFish'}>고피쉬</option>
        </select>
        <br />
        <input type="submit" value="방 생성" />
      </form>
      <div>
        <h3>응답</h3>
        <div>방 id: {roomId}</div>
        <div>핀 번호: {pinNumber}</div>
      </div>
    </div>
  );
}

function GetRoomIDbypinNumber() {
  const [pinNumber, setPinNumber] = useState('');
  const [roomId, setRoomId] = useState('');
  /** @param {SubmitEvent} e */
  function handleSubmit(e) {
    e.preventDefault();
    const request_url = host_URL + `/api/v1/room/id/${pinNumber}`;

    fetch(request_url)
      .then(res => res.json())
      .then(({ roomId, pinNumber }) => {
        setRoomId(roomId);
        setPinNumber(pinNumber);
      });
  }
  return (
    <div>
      <h2>방 번호 조회</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pinNumber">핀 번호</label>
        <input
          type="text"
          id="input__pinNumber"
          value={pinNumber}
          onChange={e => setPinNumber(e.target.value)}
        />
        <br />
        <input type="submit" value="방 번호 불러오기" />
      </form>
      <div>
        <h3>응답</h3>
        <div>방 id: {roomId}</div>
        <div>핀 번호: {pinNumber}</div>
      </div>
    </div>
  );
}
function SendMSG2SpecificRoom() {
  const [roomId, setRoomId] = useState('');
  const [content, setContent] = useState('');
  /** @param {SubmitEvent} e */
  /** @param {SubmitEvent} e */
  function handleSubmit(e) {
    e.preventDefault();

    const request_url = host_URL + '/api/v1/room/msg';
    console.log(request_url);

    fetch(request_url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomId,
        content,
      }),
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }
  return (
    <div>
      <h2>특정 방에 메세지 보내기 조회</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="roomId">방 번호</label>
        <input
          type="text"
          id="input__roomId"
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        />
        <br />
        <label htmlFor="content">내용</label>
        <input
          type="text"
          id="input__content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <br />
        <input type="submit" value="방에 메세지 보내기" />
      </form>
    </div>
  );
}

export default function MVP() {
  return (
    <div>
      <RoomCreate />
      <GetRoomIDbypinNumber />
      <SendMSG2SpecificRoom />
      <Websocket roomId={123} />
      <Websocket roomId={125} />
    </div>
  );
}
