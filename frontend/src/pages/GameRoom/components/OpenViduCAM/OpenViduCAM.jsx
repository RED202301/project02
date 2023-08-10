/** @typedef {import('openvidu-browser').StreamManager} StreamManager  */

import { useEffect, useRef } from 'react';

export default function OpenViduCAM(
  /** @type {{streamManager:StreamManager}} */ { streamManager, width, height }
) {
  const videoRef = useRef();
  useEffect(() => {
    streamManager.addVideoElement(videoRef.current);
  });
  return <video style={{ width, height }} autoPlay={true} ref={videoRef} />;
}
