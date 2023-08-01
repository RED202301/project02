
import { useEffect, useRef, useState } from 'react';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';

import './Game.css';

function UserVideoComponent(props) {
  const getNicknameTag = () => {
    if (props.streamManager.stream) {
      return JSON.parse(props.streamManager.stream.connection.data).clientData;
    } else {
      return 'Subscriber';
    }
  };

  const handleVideoClicked = () => {
    // 추가: 해당 스트림이 subscriber인 경우만 클릭 이벤트 처리
    if (!props.streamManager.stream && props.mainVideoStream) {
      props.mainVideoStream(props.streamManager);
    }
  };

  return (
    <div onClick={handleVideoClicked}>
      {/* 추가: 해당 스트림이 퍼블리셔인 경우에만 화면에 표시 */}
      {props.streamManager.stream ? (
        <OpenViduVideoComponent streamManager={props.streamManager} />
      ) : null}
      <div>
        <p>{getNicknameTag()}</p>
      </div>
    </div>
  );
}

function OpenViduVideoComponent(props) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (props.streamManager && !!videoRef.current) { // 추가적인 null 체크
      props.streamManager.addVideoElement(videoRef.current);
    }
  }, [props]);

  return <video autoPlay={true} ref={videoRef} />;
}

function Game() {
  const [chatMessage, setChatMessage] = useState('');
const [receivedMessages, setReceivedMessages] = useState([]);
  const [showChatbox, setShowChatbox] = useState(false);
const [showChatButton, setShowChatButton] = useState(true);
const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  // Function to toggle audio and video states
  const toggleAudio = () => {
    setAudioEnabled((prevAudioEnabled) => !prevAudioEnabled);
    if (state.publisher) {
      state.publisher.publishAudio(!audioEnabled);
    }
  };

  const toggleVideo = () => {
    setVideoEnabled((prevVideoEnabled) => !prevVideoEnabled);
    if (state.publisher) {
      state.publisher.publishVideo(!videoEnabled);
    }
  };
  const APPLICATION_SERVER_URL = "http://localhost:5000/";
  const [state, setState] = useState({
    mySessionId: 'SessionE',
    myUserName: 'Participant' + Math.floor(Math.random() * 100),
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: [],
  });

  let OV = new OpenVidu(); // Change const to let

  const getToken = async () => {
    const sessionId = await createSession(state.mySessionId);
    return await createToken(sessionId);
  };

  const createSession = async (sessionId) => {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data; // The token
  };

  const handleMainVideoStream = (streamManager) => {
    // 추가: 퍼블리셔인 경우 mainVideoStream 함수 호출하지 않음
    if (!streamManager.stream) {
      setState((prevState) => ({
        ...prevState,
        mainStreamManager: streamManager,
      }));
    }
  };

  useEffect(() => {
    const mySession = OV.initSession();
    setState((prevState) => ({
      ...prevState,
      session: mySession,
    }));

    mySession.on('streamCreated', (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setState((prevState) => ({
        ...prevState,
        subscribers: [...prevState.subscribers, subscriber],
      }));
    });

    mySession.on('streamDestroyed', (event) => {
      event.preventDefault();
      
      OV.deleteSubscriber(event.stream.streamManager);
      setState((prevState) => ({
        ...prevState,
        subscribers: prevState.subscribers.filter(sub => sub !== event.stream),
      }));
    });

    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    getToken().then((token) => {
      mySession
        .connect(token, { clientData: state.myUserName })
        .then(async () => {
          let publisher = await OV.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: '150x200',
            frameRate: 30,
            insertMode: 'APPEND',
            mirror: false,
          });

          mySession.publish(publisher);

          const devices = await OV.getDevices();
          const videoDevices = devices.filter((device) => device.kind === 'videoinput');
          const currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
          const currentVideoDevice = videoDevices.find((device) => device.deviceId === currentVideoDeviceId);

          setState((prevState) => ({
            ...prevState,
            currentVideoDevice: currentVideoDevice,
            mainStreamManager: publisher,
            publisher: publisher,
          }));
        })
        .catch((error) => {
          console.log('There was an error connecting to the session:', error.code, error.message);
        });
    });

    // Clean up when unmounting the component
    return () => {
      if (mySession) {
        mySession.disconnect();
      }
    };
  }, []);

  const leaveSession = () => {
    const mySession = state.session;

    if (mySession) {
      mySession.disconnect();
    }

    setState({
      mySessionId: 'SessionA',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
    });
  };

  const handleLeaveSession = () => {
    leaveSession();
    // 추가로 수행해야 할 작업들이 있을 수 있습니다.
    // 예를 들어, 게임을 종료하거나 다른 페이지로 이동하는 등의 동작을 수행할 수 있습니다.
  };
  
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
      <div className="subscribers-container">
      {state.subscribers.map((sub, i) => (
        <div key={i} className="subscriber-video col-md-6 col-xs-6">
          {/* 다른 참가자들의 비디오 화면을 보여줌 */}
          <UserVideoComponent streamManager={sub} mainVideoStream={handleMainVideoStream} />
        </div>
      ))}
      </div>
      {state.publisher !== undefined ? (
        <div className="stream-container col-md-3 col-xs-3 col-lg-3">
          <div className="streamcontainer">
            <button onClick={handleLeaveSession} className="leave">
              나가기
            </button>
            <button onClick={toggleAudio} className='leave'>마이크</button>
            <button onClick={toggleVideo} className='leave'>비디오</button>
            {/* 자신의 비디오 화면을 보여줌 */}
            <UserVideoComponent streamManager={state.publisher} mainVideoStream={handleMainVideoStream} />
          </div>

            

        </div>
      ) : null}
      <div className="streamcomponent">
        <OpenViduVideoComponent streamManager={state.session ? state.session.publisher : null} />
      </div>
    </div>
  );
}

export default Game;