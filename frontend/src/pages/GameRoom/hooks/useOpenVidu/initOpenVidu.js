import { OpenVidu } from 'openvidu-browser';
import { getToken } from './functions/api';
import { handleStreamCreated, handleStreamDestroyed } from './functions/streamHandler';

/** @typedef {import('openvidu-browser').PublisherProperties} PublisherProperties */
/** @typedef {import("openvidu-browser").Publisher} Publisher */
/** @typedef {import("openvidu-browser").Subscriber} Subscriber */
/** @typedef {Map<number, Subscriber>} subscriberMap */

/** @typedef {import('react').React} React */
/** @typedef {React.Dispatch<React.SetStateAction<T>>} setState<T> @template T */

/** @type { (setSubscriberMap:setState<subscriberMap>) => Publisher } */
export default async function initOpenVidu({
  sessionId,
  userId,
  nickname,
  setSubscriberMap,
  setPublisher,
  setSession,
}) {
  const OV = new OpenVidu();
  // 콘솔로그 없애기
  OV.enableProdMode();

  const session = OV.initSession();
  session.on('streamCreated', handleStreamCreated(session, setSubscriberMap));
  session.on('streamDestroyed', handleStreamDestroyed(setSubscriberMap));
  session.on('exception', console.warn);

  const token = await getToken(sessionId);
  await session.connect(token, { userId, nickname }).catch(error => {
    console.log('There was an error connecting to the session:', error.code, error.message);
  });

  /** @type {PublisherProperties}*/ const publisherProperties = {
    publishAudio: false,
    publishVideo: true,
    resolution: '1280x720',
    insertMode: 'APPEND',
    mirror: false,
  };

  const publisher = await OV.initPublisherAsync(undefined, publisherProperties);
  session.publish(publisher);

  setPublisher(publisher);
  setSession(session);
}
