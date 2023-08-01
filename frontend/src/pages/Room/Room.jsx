import './Room.scss';
// import {Link} from'react-router-dom';
import Card_backup from '../../components/Card/Card_backup';
import { useEffect, useRef, useState } from 'react';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';

import '../Game/Game.css';

function Room() {
    

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
    mySessionId: 'SessionB',
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
}
  return (
    <div className="Room">
      <div className="Time">
        시간 제한
      </div>
      <div className="Room1">
        <div className="Room1-1">
            <div className="Room1-1-1">
                zz  
            </div>
            <div className="Room1-1-2">
                zz  
            </div>
            <div className="Room1-1-3">
            </div>
            <div className="Room1-1-4">
                zz  
            </div>
            <div className="Room1-1-5">
                zz  
            </div>
        </div>
        <div className="Room1-2">
            <div className="Room1-2-1">
                <p>닉네임</p>
                <img className="인물1" src='src\assets\인물사진.png'></img>
            </div>
            <div className="Room1-2-2">
                <p>닉네임</p>
                <img className="인물2" src='src\assets\인물사진.png'></img>
            </div>
            <div className="Room1-2-3">
            </div>
            <div className="Room1-2-4">
                <p>닉네임</p>
                <img className="인물2" src='src\assets\인물사진.png'></img>  
            </div>
            <div className="Room1-2-5">
                <p>닉네임</p>
                <img className="인물4" src='src\assets\인물사진.png'></img>
            </div>
        </div>
      </div>
      <div className="Room2">
        <div className="Room2-1">
            <div className="Room2-1-1">
                <Card_backup width={50}
                    height={75}
                    img_url="./sample_imgs/winter.png"
                    bg_url="./sample_imgs/background.png"
                    subtitle="에스파"
                    title="윈터"></Card_backup>
            </div>    
            <div className="Room2-1-2">
                <Card_backup width={50}
                    height={75}
                    img_url="./sample_imgs/winter.png"
                    bg_url="./sample_imgs/background.png"
                    subtitle="에스파"
                    title="윈터"></Card_backup>
            </div>    
            <div className="Room2-1-3">
            <Card_backup width={150}
                    height={225}
                    img_url="./sample_imgs/winter.png"
                    bg_url="./sample_imgs/background.png"
                    subtitle="에스파"
                    title="윈터"></Card_backup>
            </div>    
            <div className="Room2-1-4">
                <div className="Room2-1-4-1">
                <Card_backup width={50}
                    height={75}
                    img_url="./sample_imgs/winter.png"
                    bg_url="./sample_imgs/background.png"
                    subtitle="에스파"
                    title="윈터"></Card_backup>
                </div>    
                <div className="Room2-1-4-2">
                    zz
                </div>    
            </div>    
            <div className="Room2-1-5">
            <Card_backup width={50}
                    height={75}
                    img_url="./sample_imgs/winter.png"
                    bg_url="./sample_imgs/background.png"
                    subtitle="에스파"
                    title="윈터"></Card_backup>
            </div>    
        </div>    
        <div className="Room2-2">
            <div className='Room2-2-1'>
                <p>닉네임</p>
                <img className="인물5" src='src\assets\인물사진.png'></img>
            </div>
            {['Room2-2-2','Room2-2-3','Room2-2-4','Room2-2-5','Room2-2-6','Room2-2-7','Room2-2-8','Room2-2-9','Room2-2-10','Room2-2-11'].map(function(a, i){
                return(
                    <div key={i} className={a}>
                    aa
                    </div>
                )})}
        </div>    
      </div>
          
    </div>
  );
}

export default Room;
