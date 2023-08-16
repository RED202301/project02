import { useState } from 'react';
import ToggleButton from './ToggleButton/ToggleButton.';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

export default function AudioToggler({ onClick, size, audioActive }) {
  const [audio, setAudio] = useState(audioActive);
  function handleClick() {
    onClick();
    setAudio(audio => !audio);
  }
  return (
    <ToggleButton
      OnIcon={FaMicrophone}
      OffIcon={FaMicrophoneSlash}
      onColor={'green'}
      offColor={'tomato'}
      onClick={handleClick}
      state={audio}
      size={size}
    />
  );
}
