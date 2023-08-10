import styles from './RotationController.module.scss';

export default function RotationController() {
  return (
    <div className={`${styles.RotationController}`}>
      <button>{`◀`}</button>
      <button>{`▶`}</button>
    </div>
  );
}
