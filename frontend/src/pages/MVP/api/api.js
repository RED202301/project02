const host_URL = 'http://192.168.30.103:5000';

export function createRoom({ roomName, timeLimit, capacity, gameType }, callback) {
  const request_url = host_URL + '/api/v1/room';
  fetch(request_url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      roomName,
      timeLimit,
      capacity,
      gameType,
    }),
  })
    .then(res => res.json())
    .then(res => callback(res));
}

export function getRoomIdByPinNumber({ pinNumber }, callback) {
  const request_url = host_URL + `/api/v1/room/id/${pinNumber}`;
  fetch(request_url)
    .then(res => res.json())
    .then(res => callback(res));
}

export function createUser({ nickname }, callback) {
  const request_url = host_URL + '/api/v1/user';

  fetch(request_url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nickname,
    }),
  })
    .then(res => res.json())
    .then(res => callback(res));
}

export function sendMessageByRoomId({ roomId, content }) {
  const request_url = host_URL + '/api/v1/room/msg';
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
  }).then(res => console.log(res));
}
