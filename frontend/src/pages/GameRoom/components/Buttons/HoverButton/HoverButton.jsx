import styles from './HoverButton.module.scss';

export default function HoverButton({ onClick, text1, text2 }) {
  return (
    <div className={`${styles.button}`} {...{ onClick }}>
      <p className={`${styles.btnText}`}>{text1}</p>
      <div className={`${styles.btnTwo}`}>
        <p className={`${styles.btnText2}`}>{text2}</p>
      </div>
    </div>
  );
}
