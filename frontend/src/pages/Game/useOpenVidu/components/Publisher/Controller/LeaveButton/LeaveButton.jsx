export default function LeaveButton({ session }) {
  return <button onClick={() => session.disconnect()}>나가기</button>;
}
