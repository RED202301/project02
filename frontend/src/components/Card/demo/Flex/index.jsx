export default function Flex({ style, children, onClick }) {
  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
        display: 'flex',
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
