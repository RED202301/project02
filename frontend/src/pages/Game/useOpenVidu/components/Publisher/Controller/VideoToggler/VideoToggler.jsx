import { useState } from 'react';

export default function VideoToggler({ streamManager }) {
  const [videoEnabled, setVideoEnabled] = useState(true);

  function toggleVideo() {
    setVideoEnabled(videoEnabled => !videoEnabled);
    streamManager.publishVideo(!videoEnabled);
  }

  return <button onClick={toggleVideo}>{videoEnabled ? '카메라 끄기' : '카메라 켜기'}</button>;
}
