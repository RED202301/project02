import { useEffect } from 'react';

import UserVideoComponent from './useOpenVidu/components/UserVideoComponent/UserVideoComponent';
import Publisher from './useOpenVidu/components/Publisher/Publisher';
import useOpenVidu from './useOpenVidu/useOpenVidu';

function Game() {
  const sessionId = 'SessionA';
  const myUserName = 'Participant' + Math.floor(Math.random() * 100);
  const { subs, publisher, session, openViduInitializer } = useOpenVidu({ sessionId, myUserName });
  useEffect(() => {openViduInitializer()}, []);

  return (
    <div>
      {subs.map((sub, i) => (
        <UserVideoComponent streamManager={sub} key={i} />
      ))}
      {publisher ? <Publisher streamManager={publisher} session={session} /> : null}
    </div>
  );
}

export default Game;
