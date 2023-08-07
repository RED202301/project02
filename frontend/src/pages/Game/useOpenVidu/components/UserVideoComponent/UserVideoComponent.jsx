import React, { useState, useRef, useEffect } from 'react';
import {
  ImageSegmenter,
  FilesetResolver,
} from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.2';
// import AudioToggler from '../../components/Publisher/Controller/AudioToggler/AudioToggler';
// import VideoToggler from '../../components/Publisher/Controller/VideoToggler/VideoToggler';
// import LeaveButton from '../../components/Publisher/Controller/LeaveButton/LeaveButton';

function OpenViduVideoComponent({ streamManager, session }) {
  const videoRef = useRef();
  const [imageSegmenter, setImageSegmenter] = useState(null);
  const [labels, setLabels] = useState([]);
  const [runningMode, setRunningMode] = useState('VIDEO'); // Set running mode to VIDEO initially
  const canvasRef = useRef(null);
  const canvasCtxRef = useRef(null);
  const legendColors = [
    [255, 0, 0, 0], // Vivid Yellow
    [0, 0, 0, 0], // Strong Purple
    // ... rest of the legend color array
  ];
  useEffect(() => {
    streamManager.addVideoElement(videoRef.current);
  }, []);

  useEffect(() => {
    const createImageSegmenter = async () => {
      const audio = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.2/wasm'
      );

      const newImageSegmenter = await ImageSegmenter.createFromOptions(
        audio,
        {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/image_segmenter/deeplab_v3/float32/1/deeplab_v3.tflite',
            delegate: 'GPU',
          },
          runningMode: runningMode,
          outputCategoryMask: true,
          outputConfidenceMasks: false,
        }
      );

      setImageSegmenter(newImageSegmenter);
      setLabels(newImageSegmenter.getLabels());
    };

    createImageSegmenter();
  }, [runningMode]);

  useEffect(() => {
    const enableCam = async () => {
      if (!imageSegmenter) {
        return;
      }

      const constraints = {
        video: true,
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener('loadeddata', predictWebcam);

        // Initialize canvas context
        canvasCtxRef.current = canvasRef.current.getContext('2d');
      } catch (error) {
        console.warn('getUserMedia() is not supported by your browser');
      }
    };

    enableCam();
  }, [imageSegmenter]);

  const predictWebcam = () => {
    if (
      videoRef.current.currentTime ===
      videoRef.current.lastWebcamTime
    ) {
      window.requestAnimationFrame(predictWebcam);
      return;
    }
    videoRef.current.lastWebcamTime = videoRef.current.currentTime;
    canvasCtxRef.current.drawImage(
      videoRef.current,
      0,
      0,
      videoRef.current.videoWidth,
      videoRef.current.videoHeight
    );
    if (!imageSegmenter) {
      return;
    }
    if (runningMode === 'IMAGE') {
      setRunningMode('VIDEO');
      imageSegmenter.setOptions({
        runningMode: 'VIDEO',
      });
    }
    const startTimeMs = performance.now();
    imageSegmenter.segmentForVideo(
      videoRef.current,
      startTimeMs,
      callbackForVideo
    );
  };

  const callbackForVideo = (result) => {
    const imageData = canvasCtxRef.current.getImageData(
      0,
      0,
      videoRef.current.videoWidth,
      videoRef.current.videoHeight
    ).data;
    const mask = result.categoryMask.getAsFloat32Array();
    let j = 0;
    for (let i = 0; i < mask.length; ++i) {
      const maskVal = Math.round(mask[i] * 255.0);
      const legendColor = legendColors[maskVal % legendColors.length];

      // Apply color only to the background and maintain original video pixel for other parts
      if (maskVal === 0) {
        imageData[j] = legendColor[0];
        imageData[j + 1] = legendColor[1];
        imageData[j + 2] = legendColor[2];
        imageData[j + 3] = legendColor[3];
      }

      j += 4;
    }
    const uint8Array = new Uint8ClampedArray(imageData.buffer);
    const dataNew = new ImageData(
      uint8Array,
      videoRef.current.videoWidth,
      videoRef.current.videoHeight
    );
    canvasCtxRef.current.putImageData(dataNew, 0, 0);
    window.requestAnimationFrame(predictWebcam);
  };

  return (
    <div style={{
      display: 'flex',
      width: '400px',
      height:'600px'
    }}>
      <section id="demos" className="invisible">
        <div className="webcam-container">
          <canvas
            id="canvas"
            ref={canvasRef}
            width="300px"
            height="300px"
            style={{ position: 'absolute', zIndex: 1 }}
          ></canvas>
          <div className="webcam" style={{ position: 'relative', zIndex: 2 }}>
            <video
              id="webcam"
              ref={videoRef}
              autoPlay
              style={{ display: 'none' }}
            ></video>

          </div>
        </div>
      </section>
    </div>
  );
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