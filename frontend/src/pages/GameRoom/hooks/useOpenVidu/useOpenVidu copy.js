import { useState } from 'react';
import { OpenVidu } from 'openvidu-browser';
import { getToken } from './functions/api';
import { handleStreamCreated, handleStreamDestroyed } from './functions/streamHandler';

/** @typedef {import('openvidu-browser').PublisherProperties} PublisherProperties */
/** @typedef {import("openvidu-browser").Publisher} Publisher */
/** @typedef {import("openvidu-browser").Subscriber} Subscriber */
/** @typedef {Map<number, Subscriber>} subscriberMap */

/** @typedef {import('react').React} React */
/** @typedef {React.Dispatch<React.SetStateAction<T>>} setState<T> @template T */

export default async function useOpenVidu({ sessionId, userId, nickname }) {
  /** @type {[subscriberMap, setState<subscriberMap>]} */
  const [subscriberMap, setSubscriberMap] = useState({});
  /** @type {[Publisher, setState<Publisher>]} */
  const [publisher, setPublisher] = useState(null);

  const OV = new OpenVidu();
  // 콘솔로그 없애기
  OV.enableProdMode();

  const session = OV.initSession();
  const token = await getToken(sessionId);
  await session.connect(token, { userId, nickname }).catch(error => {
    console.log('There was an error connecting to the session:', error.code, error.message);
  });
  async function openViduInitializer() {
    session.on('streamCreated', handleStreamCreated(session, setSubscriberMap));
    session.on('streamDestroyed', handleStreamDestroyed(setSubscriberMap));
    session.on('exception', console.warn);
  }

  async function initPublisher(session, videoSource) {
    /** @type {PublisherProperties}*/ const publisherProperties = {
      videoSource: videoSource,
      publishAudio: false,
      publishVideo: true,
      resolution: '1280x720',
      insertMode: 'APPEND',
      mirror: false,
    };
    const publisher = await OV.initPublisherAsync(undefined, publisherProperties);
    session.publish(publisher);
    setPublisher(publisher);
  }

  return {
    subscriberMap,
    publisher,
    session,
    openViduInitializer,
    initPublisher,
  };
}
