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
    <div className='App'
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'beige',
      // backgroundImage: 'url(/public/back.jpg)',
      backgroundPosition: 'cover',
    }}>
      <div>
      <div style={{ display:'flex',}}>
      {subs.map((sub, i) => (
        <UserVideoComponent streamManager={sub} key={i} />
      ))}
      </div>
      <div style={{
        position:'absolute',
        width:'200px',
        height:'300px',
        bottom: 130,
      }}>
      {publisher ? <Publisher streamManager={publisher} session={session} /> : null}
      </div>
      </div>
    </div>
  );
}

export default Game;
