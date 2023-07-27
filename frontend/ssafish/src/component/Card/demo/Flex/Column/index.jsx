import Flex from '..';

export default function Column({ style, children, onClick }) {
  return (
    <Flex style={{ ...style, flexDirection: 'column' }} onClick={onClick}>
      {children}
    </Flex>
  );
}
