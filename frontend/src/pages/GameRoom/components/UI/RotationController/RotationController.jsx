import styles from './RotationController.module.scss';

export default function RotationController({ viewAngles, view, setView }) {
  return viewAngles.length === 3 ? (
    <div className={`${styles.RotationController}`}>
      {view !== 0 ? (
        <button
          onClick={() => setView(view => (view === 0 ? view : view - 1))}
          style={{ left: 0 }}
        >{`◀`}</button>
      ) : (
        <></>
      )}
      {view !== 2 ? (
        <button
          onClick={() => setView(view => (view === 2 ? view : view + 1))}
          style={{ right: 0 }}
        >{`▶`}</button>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
}
