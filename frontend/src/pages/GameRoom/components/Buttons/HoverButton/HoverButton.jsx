import styles from './HoverButton.module.scss';

export default function HoverButton({ onClick, text1, text2, width, color }) {
  return (
    <div className={`${styles.button}`} {...{ onClick }} style={{ '--width': width || '200px' }}>
      <p className={`${styles.btnText}`}>{text1}</p>
      <div className={`${styles.btnTwo}`} style={{ background: color }}>
        <p className={`${styles.btnText2}`}>{text2}</p>
      </div>
    </div>
  );
}
