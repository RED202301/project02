export function handleStreamCreated(session, setSubs) {
  return function ({ stream }) {
    const sub = session.subscribe(stream, undefined);
    setSubs(subs => [...subs, sub]);
  };
}

export function handleStreamDestroyed(setSubs) {
  return function ({ stream }) {
    setSubs(subs => subs.filter(sub => sub.stream.streamId !== stream.streamId));
  };
}
