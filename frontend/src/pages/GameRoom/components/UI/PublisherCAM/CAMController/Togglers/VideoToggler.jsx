import { useState } from 'react';
import styles from './Toggler.module.scss';

/** @typedef {import('openvidu-browser').Publisher} Publisher */

export default function VideoToggler(/** @type {{publisher:Publisher}} */ { publisher }) {
  const [videoActive, setVideoActive] = useState(true);
  function toggleVideo() {
    publisher.publishVideo(!videoActive);
    setVideoActive(videoActive => !videoActive);
  }
  return (
    <button className={`${styles.Toggler}`} onClick={toggleVideo}>
      {videoActive ? '카메라 끄기' : '카메라 켜기'}
    </button>
  );
}
