import { useEffect, useRef } from 'react';

function OpenViduVideoComponent({ streamManager }) {
  const videoRef = useRef();
  useEffect(() => {
    streamManager.addVideoElement(videoRef.current);
  }, []);

  return <video autoPlay={true} ref={videoRef} />;
}

export default function UserVideoComponent({ streamManager }) {
  const clientData = JSON.parse(streamManager.stream.connection.data);
  return (
    <div>
      <p>{clientData.clientData}</p>
      <OpenViduVideoComponent {...{ streamManager }} />
    </div>
  );

}

// import { useEffect, useRef } from 'react';

// function OpenViduVideoComponent({ streamManager }) {
//   const videoRef = useRef();
//   useEffect(() => {
//     streamManager.addVideoElement(videoRef.current);
//   }, []);

//   return <video autoPlay={true} ref={videoRef} />;
// }

// export default function UserVideoComponent({ streamManager }) {
//   const clientData = JSON.parse(streamManager.stream.connection.data);
//   return (
//     <div>
//       <OpenViduVideoComponent {...{ streamManager }} />
//       <p>{clientData.clientData}</p>
//     </div>
//   );
// }

// import { useEffect, useRef } from 'react';

// function OpenViduVideoComponent({ streamManager }) {
//   const videoRef = useRef();
//   useEffect(() => {
//     streamManager.addVideoElement(videoRef.current);
//   }, []);

//   return <video autoPlay={true} ref={videoRef} />;
// }

// export default function UserVideoComponent({ streamManager }) {
//   const clientData = JSON.parse(streamManager.stream.connection.data);
//   return (
//     <div>
//       <OpenViduVideoComponent {...{ streamManager }} />
//       <p>{clientData.clientData}</p>
//     </div>
//   );
// }