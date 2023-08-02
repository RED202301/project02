

import './Game.css';
import { useState, useEffect, useRef } from 'react';
import { OpenVidu } from 'openvidu-browser';
import io from 'socket.io-client';
import * as mp from '@mediapipe/pose';
import * as mpSegmentation from '@mediapipe/selfie_segmentation'; // 미디어 파이프 SelfieSegmentation 모델 불러오기
const [showChatbox, setShowChatbox] = useState(false);
const [showChatButton, setShowChatButton] = useState(true);
const [sessionId, setSessionId] = useState('');
const [token, setToken] = useState('');
const videoContainerRef = useRef(null);
const [showInput, setShowInput] = useState(false);
const [inputSessionId, setInputSessionId] = useState('');
const [chatMessage, setChatMessage] = useState('');
const [receivedMessages, setReceivedMessages] = useState([]);
const [session, setSession] = useState(null);
const [isPublisher, setIsPublisher] = useState(false);
const [backgroundRemovalReady, setBackgroundRemovalReady] = useState(false);
const videoCanvasRef = useRef(null);
const segmentationModelRef = useRef(null);
const [showBackgroundRemoval, setShowBackgroundRemoval] = useState(false);
const videoRef = useRef(null);

useEffect(() => {
  initializeSession();
  initSegmentationModel();
}, []);

async function initializeSession() {
  if (!sessionId) {
    const API_SERVER_URL = "http://localhost:5000/api/sessions";
    const headers = {
      'Content-Type': 'application/json'
    };
    const body = {
      mediaMode: "ROUTED",
      recordingMode: "MANUAL",
      customSessionId: "12345",
    };

    try {
      const response = await fetch(API_SERVER_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const data = await response.json();
        setSessionId(data);
        setIsPublisher(true);
      } else {
        throw new Error('OpenVidu 세션 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('OpenVidu 세션 생성 오류:', error);
    }
  }
}
  async function initSegmentationModel() {
    // 미디어 파이프 SelfieSegmentation 모델 초기화
    const segmenter = new mpSegmentation.SelfieSegmentation({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
      },
    });
    segmenter.setOptions({
      modelSelection: 1, // 0: General model, 1: Landscape model
    });
    segmenter.onResults(handleSegmentationResults);

    // 미디어 파이프 SelfieSegmentation 모델 시작
    segmenter.reset();
    videoRef.current.onloadedmetadata = () => {
      segmenter.send({ image: videoRef.current });
    };

    // 배경 제거 준비 완료
    setBackgroundRemovalReady(true);

    // 미디어 파이프 Pose 모델 초기화
    const pose = new mp.Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });
    pose.onResults(handlePoseResults);
    pose.reset();
    videoRef.current.onloadedmetadata = () => {
      pose.send({ image: videoRef.current });
    };
  }
async function generateToken(sessionId) {
  const API_SERVER_URL = `http://localhost:5000/api/sessions/${sessionId}/connections`;
  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(API_SERVER_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({})
    });

    if (response.ok) {
      const data = await response.text();
      setToken(data);
    } else {
      throw new Error('OpenVidu 토큰 생성에 실패했습니다.');
    }
  } catch (error) {
    console.error('OpenVidu 토큰 생성 오류:', error);
  }
}
function handleSegmentationResults(results) {
  // 배경 제거를 위한 이미지 처리
  // Game 컴포넌트의 기존 코드 유지
}
async function createGame() {
  if (isPublisher) {
    const OV = new OpenVidu();
    const session = OV.initSession();
    setSession(session);

    try {
      await generateToken(sessionId);
      await session.connect(token);
      console.log('세션에 연결되었습니다.');
      console.log('세션 ID:', sessionId);
      publishStream();

      session.on('signal:my-chat', handleIncomingChat);
    } catch (error) {
      console.error('세션 연결 에러:', error.message);
    }
  }
}

function publishStream() {
  if (!publisher) {
    const OV = new OpenVidu();
    var publisher = OV.initPublisher('video-container', {
      audioSource: undefined,
      videoSource: undefined,
      publishAudio: true,
      publishVideo: true,
      resolution: '400x600',
      frameRate: 30,
      insertMode: 'APPEND',
      mirror: false
    });
    session.publish(publisher);
    setIsPublisher(publisher);
  } else {
    if (videoContainerRef.current) {
      videoContainerRef.current.style.width = '100px';
      videoContainerRef.current.style.height = '100px';

    }
  }
}

function handleJoinSession() {
  setShowInput(true);
}

async function joinSession() {
  if (inputSessionId) { // 입력한 세션 ID가 비어있지 않은지 확인
    try {
      await generateToken(inputSessionId);
      const socket = io('http://localhost:5000');
      socket.emit('joinSession', inputSessionId);

      if (!sessionId) {
        createGame();
      }

      session.on('signal:my-chat', handleIncomingChat);
    } catch (error) {
      console.error('OpenVidu 토큰 생성 오류:', error);
    }
  } else {
    alert('세션 ID를 입력하세요.');
  }
}
function handleToggleChatbox() {
  setShowChatbox(!showChatbox);
  setShowChatButton(false);

  setTimeout(() => {
    setShowChatbox(false);
    setShowChatButton(true);
  }, 5000);
}

function sendChatMessage() {
  if (session) {
    session.signal({
      data: chatMessage,
      to: [], // 모든 참가자에게 메시지 브로드캐스트
      type: 'my-chat'
    })
    .then(() => {
      console.log('메시지 전송 성공');
      setChatMessage('');
      setShowChatbox(true);
      setShowChatButton(false);

      setTimeout(() => {
        setShowChatbox(false);
        setShowChatButton(true);
      }, 5000);
    })
    .catch(error => {
      console.error(error);
    });
  } else {
    console.error('세션이 초기화되지 않았습니다. createGame 함수를 먼저 호출하세요.');
  }
}


function handleIncomingChat(event) {
  const { data, from } = event;
  setReceivedMessages(prevMessages => [ `${from.data}: ${data}`, ...prevMessages,]);
}

return (
  <div>
    <p>핀 번호: {sessionId}</p>
    <div id="video-container" ref={videoContainerRef}></div>
    <div>
      <div>
        <button onClick={createGame}>게임 생성</button>
        <button onClick={handleJoinSession}>게임 참가</button>
        {showInput && (
          <div>
            <input
              type="text"
              value={inputSessionId}
              className='inputbox'
              onChange={(e) => setInputSessionId(e.target.value)}
              placeholder="세션 ID를 입력하세요"
            />
            <button onClick={joinSession} className='joinbtn'>게임참가</button>
          </div>
        )}
      </div>
    </div>

    {/* 채팅 기능 */}
    <div className='chatposition'>
      {showChatButton && (
        <button
          style={{
            float: 'right',
            width: '40px',
            height: '15px',
            fontSize: '5px',
            textAlign: 'center',
            justifyContent: 'center',
            margin: '2px'
          }}
          onClick={handleToggleChatbox}
          className='chat-button'
        >
          채팅
        </button>
      )}
      {showChatbox && (
        <div className='chatbox'>
          {receivedMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      )}
      {showChatbox && (
        <div>
          <input
            type='text'
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder='메시지 입력'
          />
          <button onClick={sendChatMessage} className='sendbtn'>
            전송
          </button>
        </div>
      )}
    </div>

    {/* 미디어 파이프 SelfieSegmentation 모델이 준비되면 배경 제거를 위한 비디오 캔버스 추가 */}
    {backgroundRemovalReady && (
      <canvas
        ref={videoCanvasRef}
        style={{ position: 'absolute', top: 0, left: 0, display: 'none' }}
      />
    )}
  </div>
);
}
