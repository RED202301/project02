export default function withScaler(Component) {
  return ({ width, height, ...props }) => {
    return (
      <div
        style={{
          position: 'absolute',
          width,
          height,
          boxSizing: 'border-box',
        }}
      >
        <Component {...props} />
      </div>
    );
  };
}
