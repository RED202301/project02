/** @typedef {import('openvidu-browser').StreamManager} StreamManager  */

import { useEffect, useRef } from 'react';

export default function OpenViduCAM(
  /** @type {{streamManager:StreamManager, width:number, height:number, handleClick, style}} */ {
    streamManager,
    width,
    height,
    style,
  }
) {
  /** @type {React.MutableRefObject<HTMLVideoElement>} */
  const videoRef = useRef();
  useEffect(() => {
    streamManager.addVideoElement(videoRef.current);
  }, []);
  return (
    <video
      style={{ ...style, width, height, boxSizing: 'border-box' }}
      autoPlay={true}
      ref={videoRef}
    />
  );
}
