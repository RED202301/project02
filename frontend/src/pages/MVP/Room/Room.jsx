import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const host_URL = 'http://192.168.30.103:5000';

export default function Room({ roomId }) {
  const stompClient = useRef();
  const connectButton = useRef();
  const disconnectButton = useRef();
  const sendMessageButton = useRef();
  const messageInput = useRef();
  const messagesDiv = useRef();
  const [messages, setMessages] = useState([]);

  function connect() {
    const socket = new SockJS(host_URL + '/ssafish');
    stompClient.current = Stomp.over(socket);

    // 유저 아이디, 룸아이디
    stompClient.current.connect({}, function (/** frame */) {
      connectButton.current.disabled = true;
      disconnectButton.current.disabled = false;
      sendMessageButton.current.disabled = false;
      setMessages(messages => [['Connected', ...messages]]);

      // Replace roomId with the appropriate room ID
      //   const roomId = 123; // Replace with the desired room ID

      stompClient.current.subscribe(`/sub/${roomId}`, function (message) {
        const { userId, content } = JSON.parse(message.body);
        setMessages(messages => [`${userId}: ${content}`, ...messages]);
      });

      stompClient.current.send(`/pub/enter/${roomId}`, {}, JSON.stringify({ userId: roomId * 2 }));
    });
  }

  function disconnect() {
    if (stompClient.current !== null) {
      stompClient.current.disconnect();
      connectButton.current.disabled = false;
      disconnectButton.current.disabled = true;
      sendMessageButton.current.disabled = true;
      setMessages(messages => [['Disconnected', ...messages]]);
    }
  }

  function sendMessage() {
    const message = messageInput.current.value;

    // Replace roomId with the appropriate room ID
    // const roomId = 123; // Replace with the desired room ID

    stompClient.current.send(`/pub/msg/${roomId}`, {}, JSON.stringify({ content: message }));
    messageInput.current.value = '';
  }

  useEffect(() => {
    connectButton.current.addEventListener('click', connect);
    disconnectButton.current.addEventListener('click', disconnect);
    sendMessageButton.current.addEventListener('click', sendMessage);
    connect();
    return () => disconnect();
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <button onClick={() => setSearchParams({})}>나가기</button>
      <div>
        <h1>WebSocket API Test - Room {roomId}</h1>
        <button ref={connectButton}>Connect</button>
        <button ref={disconnectButton} disabled>
          Disconnect
        </button>
        <button ref={sendMessageButton} disabled>
          Send Message
        </button>
        <br />
        <input type="text" ref={messageInput} placeholder="Enter message" />
        <br />
        <div ref={messagesDiv}>
          {messages.map((msg, idx) => {
            return <p key={idx}>{msg}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
