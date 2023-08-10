import { useState } from 'react';
import styles from './Toggler.module.scss';

/** @typedef {import('openvidu-browser').Publisher} Publisher */

export default function AudioToggler(/** @type {{publisher:Publisher}} */ { publisher }) {
  const [audioActive, setAudioActive] = useState(true);
  function toggleAudio() {
    publisher.publishAudio(!audioActive);
    setAudioActive(audioActive => !audioActive);
  }
  return (
    <button className={`${styles.Toggler}`} onClick={toggleAudio}>
      {audioActive ? '마이크 끄기' : '마이크 켜기'}
    </button>
  );
}
