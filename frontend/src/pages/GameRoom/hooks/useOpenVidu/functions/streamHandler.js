/** @typedef {import("openvidu-browser").Session} Session */
/** @typedef {import("openvidu-browser").StreamEvent} StreamEvent */
/** @typedef {import("../useOpenVidu").subscriberMap} subscriberMap */

/** @typedef {import('react').React} React */
/** @typedef {React.Dispatch<React.SetStateAction<T>>} setState<T> @template T */

export function handleStreamCreated(
  /** @type {Session}*/ session,
  /** @type {setState<subscriberMap>}*/ setSubscriberMap
) {
  return function (/** @type {StreamEvent}*/ { stream }) {
    const sub = session.subscribe(stream, undefined);
    const { userId } = JSON.parse(sub.stream.connection.data);
    setSubscriberMap(subs => ({ ...subs, [userId]: sub }));
  };
}

export function handleStreamDestroyed(/** @type {setState<subscriberMap>}*/ setSubscriberMap) {
  return function (/** @type {StreamEvent}*/ { stream }) {
    const { userId } = JSON.parse(stream.connection.data);
    setSubscriberMap(subs => {
      const remains = { ...subs };
      delete remains[userId];
      return remains;
    });
  };
}
