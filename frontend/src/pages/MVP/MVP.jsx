import { useEffect, useState } from 'react';
import Websocket from './Room/Room';
import { useParams, useSearchParams } from 'react-router-dom';
import Room from './Room/Room';
import { createRoom, getRoomIdByPinNumber, createUser, sendMessageByRoomId } from './api/api';

const host_URL = 'http://192.168.30.103:5000';

function RoomCreate() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState('');
  const [timeLimit, setTimeLimit] = useState(45);
  const [capacity, setCapacity] = useState(5);
  const [gameType, setGameType] = useState('GoFish');

  function createRoomCallback({ roomId, pinNumber }) {
    console.log(pinNumber);
    console.log(roomId);
    setSearchParams({ roomId });
    // setSearchParams({ pinNumber });
  }

  /** @param {SubmitEvent} e */
  function handleSubmit(e) {
    e.preventDefault();
    createRoom({ roomName: name, timeLimit, capacity, gameType }, createRoomCallback);
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
    </div>
  );
}

function EnterRoomByPinNumber() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pinNumber, setPinNumber] = useState('');
  function getRoomIdByPinNumberCallback({ roomId }) {
    // setRoomId(roomId);
    // setPinNumber(pinNumber);
    setSearchParams({ roomId });
  }
  /** @param {SubmitEvent} e */
  function handleSubmit(e) {
    e.preventDefault();
    getRoomIdByPinNumber({ pinNumber }, getRoomIdByPinNumberCallback);
  }
  return (
    <div>
      <h2>핀 번호로 접속</h2>
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
    </div>
  );
}

function EnterRoomById() {
  const [roomId, setRoomId] = useState('');
  const [room, setRoom] = useState('');
  /** @param {SubmitEvent} e */
  function handleSubmit(e) {
    e.preventDefault();
    setRoom(roomId);
  }
  return (
    <div>
      <h2>방 번호로 접속</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input__roomId">방 번호</label>
        <input
          type="text"
          id="input__roomId"
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        />
        <br />
        <input type="submit" value="방 번호 불러오기" />
      </form>
      {room ? (
        <div>
          {/* <div>핀 번호: {pinNumber}</div> */}
          <Websocket roomId={room} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function SendMSG2SpecificRoom() {
  const [roomId, setRoomId] = useState('');
  const [content, setContent] = useState('');
  /** @param {SubmitEvent} e */
  function handleSubmit(e) {
    e.preventDefault();
    sendMessageByRoomId({ roomId, content });
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

function GetUserId() {
  const [roomId, setRoomId] = useState('');
  const [nickname, setNickname] = useState('');
  function handleSubmit(/** @type {SubmitEvent} */ e) {
    e.preventDefault();
    createUser({ nickname }, console.log);
  }
  return (
    <div>
      <h2>유저 생성</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input__roomId">방 번호</label>
        <input
          type="text"
          id="input__roomId"
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        />
        <br />
        <label htmlFor="input__nickname">닉네임</label>
        <input
          type="text"
          id="input__nickname"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
        />
        <input type="submit" value="유저생성" />
      </form>
    </div>
  );
}

export default function MVP() {
  const [searchParams, setSeratchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');
  const pinNumber = searchParams.get('pinNumber');

  return (
    <div>
      {!pinNumber && !roomId ? (
        <>
          <RoomCreate />
          <EnterRoomByPinNumber />
          <GetUserId />
          <EnterRoomById />
          <SendMSG2SpecificRoom />
        </>
      ) : roomId ? (
        <>
          <Room roomId={roomId} />
        </>
      ) : (
        <>
          <Room pinNumber={pinNumber} />
        </>
      )}
    </div>
  );
}
