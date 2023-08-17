import styles from './Neon.module.scss';

export default function Neon({ children, fontSize, current, selected, able }) {
  return (
    <div
      className={`
      ${styles.Neon} 
      ${current && styles.current} 
      ${selected && styles.selected} 
      ${able && styles.able} 
      `}
      style={{ '--font-size': fontSize }}
    >
      {children}
    </div>
  );
}
