import { useState } from 'react';
import ToggleButton from './ToggleButton/ToggleButton.';
import { TbHandStop, TbHandOff } from 'react-icons/tb';

export default function HandToggler({ onClick, size }) {
  const [hand, setHand] = useState(false);
  function handleClick() {
    onClick();
    setHand(hand => !hand);
  }
  return (
    <ToggleButton
      OnIcon={TbHandStop}
      OffIcon={TbHandOff}
      onColor={'white'}
      offColor={'white'}
      onClick={handleClick}
      state={hand}
      size={size}
    />
  );
}
