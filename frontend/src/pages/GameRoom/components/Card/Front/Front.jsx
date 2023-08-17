import Background from '../Background/Background';
import Content from './Content/Content';
import styles from './Front.module.scss';

export default function Front({ mainTitle, subTitle, point, mainImgUrl }) {
  return (
    <div className={styles.Front}>
      <Background />
      <Content {...{ mainTitle, subTitle, point, mainImgUrl }} />
    </div>
  );
}
