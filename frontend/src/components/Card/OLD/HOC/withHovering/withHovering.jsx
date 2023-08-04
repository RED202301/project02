import styles from './withHovering.module.scss';

export default function withHovering(Component) {
  return ({ ...props }) => {
    return (
      <div className={`${styles.withHovering}`} style={{ width: '100%', height: '100%' }}>
        <Component {...props} />
      </div>
    );
  };
}
