import { useState } from 'react';
import styles from './Neon.module.scss';

export default function Neon({ children, fontSize }) {
  const [on, setOn] = useState(false);
  return (
    <div
      className={`
      ${styles.Neon} 
      ${on && styles.on}
      `}
      style={{ '--font-size': fontSize }}
      // onClick={() => setOn(on => !on)}
    >
      {children}
    </div>
  );
}
