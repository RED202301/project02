import styles from './Content.module.scss';

export default function Content({ mainTitle, subTitle, point, mainImgUrl }) {
  let stars = '';
  for (let i = 0; i < point; i++) {
    stars += '⭐';
  }
  return (
    <div className={styles.Content}>
      <div className={styles.subTitle}>&nbsp;&nbsp;{subTitle}</div>
      <div className={styles.mainTitle}>&nbsp;&nbsp;{mainTitle}</div>
      <div className={styles.point}>&nbsp;{stars}</div>
      <div className={styles.img} style={{ backgroundImage: `url('${mainImgUrl}')` }} />
    </div>
  );
}
