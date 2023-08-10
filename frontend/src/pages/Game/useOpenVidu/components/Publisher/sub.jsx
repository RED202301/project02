import React, { useState, useRef, useEffect } from 'react';
import {
  ImageSegmenter,
  FilesetResolver,
} from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.2';

function OpenViduVideoComponent({ streamManager }) {
  const localVideoRef = useRef(); // Local webcam video element
  const remoteVideoRef = useRef(); // Remote stream video element
  const canvasRef = useRef(null);
  const canvasCtxRef = useRef(null);
  const [imageSegmenter, setImageSegmenter] = useState(null);
  const [runningMode, setRunningMode] = useState('VIDEO');
  const legendColors = [
    [255, 0, 0, 0], // Vivid Yellow
    [0, 0, 0, 0],  // Strong Purple
    // ... rest of the legend color array
  ];

  useEffect(() => {
    const createImageSegmenter = async () => {
      const audio = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.2/wasm'
      );

      const newImageSegmenter = await ImageSegmenter.createFromOptions(audio, {
        baseOptions: {
          // modelAssetBuffer : 유형이 지정된 배열로 모델 자산 파일내용(Uint8Array)
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/image_segmenter/deeplab_v3/float32/1/deeplab_v3.tflite',
            // 메모리에 매핑할 모델자산의 경로(TrustedResourceUrl)
          delegate: 'GPU',
          // MediaPipe 파이프라인을 실행하기 위해 장치 대리자를 통해 하드웨어 가속을 활성화 함(기본값: CPU)
        },
        runningMode: runningMode, //ㅑㅡㅁㅎㄷ 
        outputCategoryMask: true,
        outputConfidenceMasks: false,
      });

      setImageSegmenter(newImageSegmenter);
    };

    createImageSegmenter();
  }, [runningMode]);

  useEffect(() => {
    const enableCam = async () => {
      if (!imageSegmenter) {
        return;
      }

      const constraints = { video: true };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.addEventListener('loadeddata', predictWebcam);

        // Initialize canvas context
        canvasCtxRef.current = canvasRef.current.getContext('2d');
      } catch (error) {
        console.warn('getUserMedia() is not supported by your browser');
      }
    };

    enableCam();
  }, [imageSegmenter]);

  const predictWebcam = () => {
    if (localVideoRef.current.currentTime === localVideoRef.current.lastWebcamTime) {
      window.requestAnimationFrame(predictWebcam);
      return;
    }
    localVideoRef.current.lastWebcamTime = localVideoRef.current.currentTime;
    canvasCtxRef.current.drawImage(
      localVideoRef.current,
      0,
      0,
      localVideoRef.current.videoWidth,
      localVideoRef.current.videoHeight
    );

    if (!imageSegmenter) {
      return;
    }

    if (runningMode === 'IMAGE') {
      setRunningMode('LIVE_STREAM');
      imageSegmenter.setOptions({
        runningMode: 'LIVE_STREAM',
      });
    }

    const startTimeMs = performance.now();
    imageSegmenter.segmentForVideo(
      localVideoRef.current,
      startTimeMs,
      callbackForVideo
    );
  };

  const callbackForVideo = (result) => {
    const imageData = canvasCtxRef.current.getImageData(
      0,
      0,
      localVideoRef.current.videoWidth,
      localVideoRef.current.videoHeight
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
      localVideoRef.current.videoWidth,
      localVideoRef.current.videoHeight
    );

    canvasCtxRef.current.putImageData(dataNew, 0, 0);
    window.requestAnimationFrame(predictWebcam);
  };

  return (
    <div style={{ display: 'flex', width: '400px', height: '600px' }}>
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
            {/* Display local webcam video */}
            <video
              id="webcam"
              ref={localVideoRef}
              autoPlay
              style={{ display: 'none' }}
            ></video>
            {/* Display remote video stream */}
            <video
              id="remoteVideo"
              ref={remoteVideoRef}
              autoPlay
              style={{ display: 'block' }}
              srcObject={streamManager.stream} // Assign the remote stream to the video element
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
      <OpenViduVideoComponent streamManager={streamManager} />
    </div>
  );
}


{publisher ? <Publisher streamManager={publisher} session={session} /> : null}

{subs.map((sub, i) => (
  <UserVideoComponent streamManager={sub} key={i} />
))}


<p>{clientData.clientData}</p>
<OpenViduVideoComponent streamManager={streamManager} />
</div>