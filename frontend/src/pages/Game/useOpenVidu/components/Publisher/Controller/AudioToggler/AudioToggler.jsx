import { useState } from 'react';

export default function AudioToggler({ streamManager }) {
  const [audioEnabled, setAudioEnabled] = useState(true);

  function toggleAudio() {
    setAudioEnabled(audioEnabled => !audioEnabled);
    streamManager.publishAudio(!audioEnabled);
  }

  return <button onClick={toggleAudio}>{audioEnabled ? '마이크 끄기' : '마이크 켜기'}</button>;
}
