import { useEffect, useRef } from 'react';

export default function MVP({ roomId }) {
  let stompClient = null;
  const connectButton = useRef();
  const disconnectButton = useRef();
  const sendMessageButton = useRef();
  const messageInput = useRef();
  const messagesDiv = useRef();

  function showMessage(message) {
    const p = document.createElement('p');
    p.innerText = message;
    messagesDiv.current.appendChild(p);
  }

  function connect() {
    const socket = new SockJS('http://192.168.30.103:5000/ssafish');
    stompClient = Stomp.over(socket);

    // 유저 아이디, 룸아이디
    stompClient.connect(
      {
        roomId,
        userId: roomId * 2,
      },
      function (frame) {
        connectButton.current.disabled = true;
        disconnectButton.current.disabled = false;
        sendMessageButton.current.disabled = false;
        showMessage('Connected');

        // Replace roomId with the appropriate room ID
        //   const roomId = 123; // Replace with the desired room ID

        stompClient.subscribe(`/sub/${roomId}`, function (message) {
          showMessage(JSON.parse(message.body).content);
        });
      }
    );
  }

  function disconnect() {
    if (stompClient !== null) {
      stompClient.disconnect();
      connectButton.current.disabled = false;
      disconnectButton.current.disabled = true;
      sendMessageButton.current.disabled = true;
      showMessage('Disconnected');
    }
  }

  function sendMessage() {
    const message = messageInput.current.value;

    // Replace roomId with the appropriate room ID
    // const roomId = 123; // Replace with the desired room ID

    stompClient.send(`/pub/msg/${roomId}`, {}, JSON.stringify({ content: message }));
    messageInput.current.value = '';
  }

  useEffect(() => {
    connectButton.current.addEventListener('click', connect);
    disconnectButton.current.addEventListener('click', disconnect);
    sendMessageButton.current.addEventListener('click', sendMessage);
  }, []);

  return (
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
      <div ref={messagesDiv}></div>
    </div>
  );
}
