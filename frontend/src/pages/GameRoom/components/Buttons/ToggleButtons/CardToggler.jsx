import { useState } from 'react';
import ToggleButton from './ToggleButton/ToggleButton.';
import { TbPlayCard, TbPlayCardOff } from 'react-icons/tb';

export default function CardToggler({ onClick, size }) {
  const [card, setCard] = useState(false);
  function handleClick() {
    onClick();
    setCard(card => !card);
  }
  return (
    <ToggleButton
      OnIcon={TbPlayCard}
      OffIcon={TbPlayCardOff}
      onColor={'white'}
      offColor={'white'}
      onClick={handleClick}
      state={card}
      size={size}
    />
  );
}
