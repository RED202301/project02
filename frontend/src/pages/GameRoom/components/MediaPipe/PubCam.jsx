import { ImageSegmenter, FilesetResolver } from '@mediapipe/tasks-vision';
import { useEffect, useRef, useState } from 'react';
import styles from './PubCam.module.scss';

/** @typedef {import('openvidu-browser').Publisher} Publisher */

export default function MeidaPipe({
  webcamRunning,
  setWebcamRunning,
  mediapipe,
  selected,
  current,
}) {
  const [videoWidth, setVideoWidth] = useState(0);
  const [videoHeight, setVideoHeight] = useState(0);
  const videoRef = useRef();
  /** @type {React.MutableRefObject<HTMLCanvasElement>} */
  const canvasRef = useRef();
  const contextRef = useRef();
  const canvasRef2 = useRef();
  const contextRef2 = useRef();
  const runningMode = useRef();
  const lastWebcamTime = useRef();
  const imageSegmenter = useRef();

  async function createImageSegmenter() {
    const audio = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    );
    imageSegmenter.current = await ImageSegmenter.createFromOptions(audio, {
      baseOptions: {
        modelAssetPath:
          'https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter_landscape/float16/latest/selfie_segmenter_landscape.tflite',
        delegate: 'GPU',
      },
      runningMode: runningMode.current,
      outputCategoryMask: true,
      outputConfidenceMasks: false,
    });
  }

  function getFaceImage(mask) {
    const video = videoRef.current;
    const canvasCtx2 = contextRef2.current;

    canvasCtx2.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    const imageData = canvasCtx2.getImageData(0, 0, video.videoWidth, video.videoHeight).data;

    let j = 0;

    for (let i = 0; i < mask.length; ++i) {
      if (mask[i] > 0) {
        imageData[j] = 0;
        imageData[j + 1] = 0;
        imageData[j + 2] = 0;
        imageData[j + 3] = 0;
      }

      j += 4;
    }
    const uint8Array = new Uint8ClampedArray(imageData.buffer);
    const image = new ImageData(uint8Array, video.videoWidth, video.videoHeight);

    return image;
  }

  function callbackForVideo(/**@type {ImageSegmenterResult} */ result) {
    const canvasCtx = contextRef.current;

    canvasCtx.save();
    const mask = result.categoryMask.getAsFloat32Array();
    const faceImage = getFaceImage(mask);
    canvasCtx.putImageData(faceImage, 0, 0);
    canvasCtx.restore();

    if (webcamRunning === true) {
      window.requestAnimationFrame(predictWebcam);
    }
  }

  async function predictWebcam() {
    if (!mediapipe) return;
    try {
      const video = videoRef.current;

      if (video.currentTime === lastWebcamTime.current) {
        if (webcamRunning === true) {
          window.requestAnimationFrame(predictWebcam);
        }
        return;
      }
      lastWebcamTime.current = video.currentTime;
      // Do not segmented if imageSegmenter hasn't loaded
      if (imageSegmenter.current === undefined) {
        return;
      }
      // if image mode is initialized, create a new segmented with video runningMode
      if (runningMode.current === 'IMAGE') {
        runningMode.current = 'VIDEO';
        await imageSegmenter.current.setOptions({
          runningMode: runningMode.current,
        });
      }
      const startTimeMs = performance.now();

      // Start segmenting the stream.
      imageSegmenter.current.segmentForVideo(video, startTimeMs, callbackForVideo);
    } catch (error) {
      predictWebcam();
    }
  }

  function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  function handleVideoResize() {
    const video = videoRef.current;
    canvasRef.current.width = video.videoWidth;
    canvasRef.current.height = video.videoHeight;
    canvasRef2.current.width = video.videoWidth;
    canvasRef2.current.height = video.videoHeight;
    setVideoWidth(() => video.videoWidth);
    setVideoHeight(() => video.videoHeight);
  }

  useEffect(() => {
    runningMode.current = 'IMAGE';
    lastWebcamTime.current = -1;

    contextRef.current = canvasRef.current.getContext('2d');
    canvasRef2.current = document.createElement('canvas');
    contextRef2.current = canvasRef2.current.getContext('2d');

    handleVideoResize();
    videoRef.current.addEventListener('resize', handleVideoResize);

    hasGetUserMedia()
      ? (async () => {
          await createImageSegmenter();
          videoRef.current.addEventListener('loadeddata', predictWebcam);

          // getUsermedia parameters.
          const constraints = { video: true };
          // Activate the webcam stream.
          videoRef.current.srcObject = await navigator.mediaDevices.getUserMedia(constraints);
        })()
      : () => {
          setWebcamRunning(() => false);
          console.warn('getUserMedia() is not supported by your browser');
        };
  }, []);

  return (
    <div className={`${styles.container}`}>
      <video className={`${mediapipe ? styles.video : ''}`} ref={videoRef} autoPlay={true} />
      <canvas className={`${styles.canvas}`} ref={canvasRef} />
      <div
        className={`${styles.border} ${current ? styles.current : selected ? styles.selected : ''}`}
        style={{
          width: `${videoWidth}px`,
          height: `${videoHeight}px`,
        }}
      ></div>
    </div>
  );
}
