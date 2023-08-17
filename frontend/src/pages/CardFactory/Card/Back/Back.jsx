import Background from '../Background/Background';
import styles from './Back.module.scss';

export default function Back() {
  return (
    <div className={styles.Back}>
      <Background>
        <i>SSAFISH!</i>
      </Background>
    </div>
  );
}
