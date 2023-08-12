const host_URL = import.meta.env.VITE_SERVER_URL;

const ENTER = 'ENTER';
const EXIT = 'EXIT';
const START_GAME = 'START_GAME';
const AUTO_DRAW = 'AUTO_DRAW';
const ENROLL = 'ENROLL';
const SELECT_PLAYER_TURN = 'SELECT_PLAYER_TURN';
const TEST_PLAYER = 'TEST_PLAYER';
const SELECT_PLAYER = 'SELECT_PLAYER';
const SELECT_CARD_TURN = 'SELECT_CARD_TURN';
const SELECT_CARD = 'SELECT_CARD';
const REPLY_TURN = 'REPLY_TURN';
const REPLY = 'REPLY';
const CARD_MOVE = 'CARD_MOVE';
const END_GAME = 'END_GAME';
const WINNER_CEREMONY = 'WINNER_CEREMONY';

export function useStomp() {
  const socket = new SockJS(host_URL + '/ssafish');
  const stompClient = Stomp.over(socket);
  return stompClient;
}

export function sendMessage({ stompClient, roomId, message }) {
  stompClient.send(`/pub/msg/${roomId}`, {}, JSON.stringify({ content: message }));
}

/** @typedef {'WAITING'|'START_GAME'|'AUTO_DRAW'|'ENROLL'|'SELECT_PLAYER_TURN'|'SELECT_PLAYER'|'SELECT_CARD_TURN'|'SELECT_CARD'|'REPLY_TURN'|'REPLY'|'CARD_MOVE'|'END_GAME'|'WINNER_CEREMONY'} phase*/

export function connect(
  /** @type {{callbacks:Map<phase, Function>}} */ {
    stompClient,
    roomId,
    userId,
    nickname,
    callbacks,
  }
) {
  stompClient.connect({}, async function (/** frame */) {
    subscribe({ stompClient, roomId, callbacks });
    enterRoom({ stompClient, roomId, userId, nickname });
  });
}

export function disconnect({ stompClient }) {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
}

/** @typedef {import('../../components/Cards/Card/Card').Card} Card */
/** @typedef {import('../../components/Cards/Card/Card').cardMap} cardMap */
export function subscribe(
  /** @type {{callbacks:Map<phase, Function>}} */
  { stompClient, roomId, callbacks }
) {
  stompClient.subscribe(`/sub/${roomId}`, function (subData) {
    const subJson = JSON.parse(subData.body).body;
    switch (subJson.type) {
      case ENTER:
        {
          const { type, playerList, userId } = subJson;
          callbacks[type](playerList, userId);
        }
        break;
      case EXIT:
        {
          const { type, players, userId } = subJson;
          callbacks[type](players, userId);
        }
        break;

      case START_GAME:
        {
          /** @type {{type:phase, cards:Card[]}}*/ const { type, cards } = subJson;
          /** @type {cardMap} */ const cardMap = {};
          cards.forEach(card => {
            cardMap[card.cardId] = card;
          });
          callbacks[type](type, cardMap);
          console.log(type, cards, cardMap);
        }
        break;
      case AUTO_DRAW:
        {
          /** @type {{type:phase, player:number, cardId:number}}*/
          const { type, player, cardId } = subJson;
          callbacks[type](type, player, cardId);
          console.log(type, player, cardId);
        }
        break;
      case ENROLL:
        {
          /** @type {{type:phase, player:number, cardId:number}}*/
          const { type, player, cardId } = subJson;
          callbacks[type](type, player, cardId);
          console.log(type, player, cardId);
        }
        break;
      case SELECT_PLAYER_TURN:
        {
          /** @type {{type:phase, player:number}}*/
          const { type, player } = subJson;
          callbacks[type](type, player);
          console.log(type, player);
        }
        break;
      case TEST_PLAYER:
        {
          /** @type {{type:phase, player:number}}*/
          const { type, player } = subJson;
          callbacks[type](player);
          console.log(type, player);
        }
        break;
      case SELECT_PLAYER:
        {
          /** @type {{type:phase, requester:number, responser:number}}*/
          const { type, requester, responser } = subJson;
          callbacks[type](type, requester, responser);
          console.log(type, requester, responser);
        }
        break;
      case SELECT_CARD_TURN:
        {
          /** @type {{type:phase, player:number}}*/
          const { type, player } = subJson;
          callbacks[type](type, player);
          console.log(type, player);
        }
        break;

      case SELECT_CARD:
        {
          /** @type {{type:phase, player:number, cardId:number}}*/
          const { type, player, cardId } = subJson;
          callbacks[type](type, player, cardId);
          console.log(type, player, cardId);
        }
        break;
      case REPLY_TURN:
        {
          /** @type {{type:phase, player:number, cardId:number}}*/
          const { type, player, cardId } = subJson;
          callbacks[type](type, player, cardId);
          console.log(type, player, cardId);
        }
        break;
      case REPLY:
        {
          /** @type {{type:phase, requester:number, responser:number, isGoFish:boolean}}*/
          const { type, requester, responser, isGoFish } = subJson;
          callbacks[type](type, requester, responser, isGoFish);
          console.log(type, requester, responser, isGoFish);
        }
        break;
      case CARD_MOVE:
        {
          /** @type {{type:phase, from:number, to:number}}*/
          const { type, from, to } = subJson;
          callbacks[type](type, from, to);
          console.log(type, from, to);
        }
        break;
      case END_GAME:
        {
          /** @type {{type:phase}}*/
          const { type } = subJson;
          callbacks[type](type);
          console.log(type);
        }
        break;
      case WINNER_CEREMONY:
        {
          /** @type {{type:phase, player:number}}*/
          const { type, player } = subJson;
          callbacks[type](type, player);
          console.log(type, player);
        }
        break;

      default:
        break;
    }
  });
}

export function enterRoom({ stompClient, roomId, userId, nickname }) {
  stompClient.send(`/pub/enter/${roomId}`, {}, JSON.stringify({ userId, nickname }));
}

export function startGame({ stompClient, roomId }) {
  stompClient.send(`/pub/${roomId}/start-game`, {}, JSON.stringify({ type: START_GAME }));
}
export function testPlayer({ stompClient, roomId, player }) {
  stompClient.send(`/pub/${roomId}/test-player`, {}, JSON.stringify({ type: TEST_PLAYER, player }));
}
export function selectPlayer({ stompClient, roomId, requester, responser }) {
  stompClient.send(
    `/pub/${roomId}/select-player`,
    {},
    JSON.stringify({ type: SELECT_PLAYER, requester, responser })
  );
}
export function selectCard({ stompClient, roomId, player, cardId }) {
  stompClient.send(
    `/pub/${roomId}/select-card`,
    {},
    JSON.stringify({ type: SELECT_CARD, player, cardId })
  );
}
export function reply({ stompClient, roomId, requester, responser, goFish }) {
  stompClient.send(
    `/pub/${roomId}/reply`,
    {},
    JSON.stringify({ type: REPLY, requester, responser, goFish })
  );
}
