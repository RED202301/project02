import { useState } from 'react';
import ToggleButton from './ToggleButton/ToggleButton.';
import { FaVideo, FaVideoSlash } from 'react-icons/fa';

export default function VideoToggler({ onClick, size, videoActive }) {
  const [video, setVideo] = useState(videoActive);
  function handleClick() {
    onClick();
    setVideo(video => !video);
  }
  return (
    <ToggleButton
      OnIcon={FaVideo}
      OffIcon={FaVideoSlash}
      onColor={'green'}
      offColor={'tomato'}
      onClick={handleClick}
      state={video}
      size={size}
    />
  );
}
