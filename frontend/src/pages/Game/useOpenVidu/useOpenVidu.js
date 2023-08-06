import { useState } from 'react';
import { OpenVidu } from 'openvidu-browser';

import { getToken } from './functions/api';
import { handleStreamCreated, handleStreamDestroyed } from './functions/streamHandler';

export default function useOpenVidu({ sessionId, myUserName }) {
  const [subs, setSubs] = useState([]);
  const [publisher, setPublisher] = useState(null);
  const [session, setSession] = useState(null);

  const publisherProperties = {
    publishAudio: true,
    publishVideo: true,
    resolution: '1280x720',
    insertMode: 'APPEND',
    mirror: false,
  };

  async function openViduInitializer() {
    const OV = new OpenVidu();
    const session = OV.initSession();
    setSession(session);

    session.on('streamCreated', handleStreamCreated(session, setSubs));
    session.on('streamDestroyed', handleStreamDestroyed(setSubs));
    session.on('exception', console.warn);

    const token = await getToken(sessionId);
    await session.connect(token, { clientData: myUserName }).catch(error => {
      console.log('There was an error connecting to the session:', error.code, error.message);
    });

    const publisher = await OV.initPublisherAsync(undefined, publisherProperties);
    session.publish(publisher);
    setPublisher(publisher);
  }

  return {
    subs,
    publisher,
    session,
    openViduInitializer,
  };
}
