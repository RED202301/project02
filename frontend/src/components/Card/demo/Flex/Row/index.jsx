import Flex from '..';

export default function Row({ style, children, onClick }) {
  return (
    <Flex style={{ ...style, flexDirection: 'row' }} onClick={onClick}>
      {children}
    </Flex>
  );
}
