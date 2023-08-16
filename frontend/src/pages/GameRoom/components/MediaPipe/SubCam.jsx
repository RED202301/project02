import { ImageSegmenter, FilesetResolver } from '@mediapipe/tasks-vision';
import { useEffect, useRef, useState } from 'react';
import styles from './SubCam.module.scss';

/** @typedef {import('openvidu-browser').Publisher} Publisher */

export default function MeidaPipe({ subscriber, mediapipe, current, selected, onClick }) {
  const [videoWidth, setVideoWidth] = useState(0);
  const [videoHeight, setVideoHeight] = useState(0);
  const videoRef = useRef();
  /** @type {React.MutableRefObject<HTMLCanvasElement>} */
  const canvasRef = useRef();
  const contextRef = useRef();
  const canvasRef2 = useRef();
  const contextRef2 = useRef();
  let runningMode = 'IMAGE';
  let lastWebcamTime = -1;
  let imageSegmenter;

  async function createImageSegmenter() {
    const audio = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    );
    imageSegmenter = await ImageSegmenter.createFromOptions(audio, {
      baseOptions: {
        modelAssetPath:
          'https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter_landscape/float16/latest/selfie_segmenter_landscape.tflite',
        delegate: 'GPU',
      },
      runningMode: runningMode,
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

    if (subscriber.stream.videoActive === true) {
      window.requestAnimationFrame(predictWebcam);
    }
  }

  async function predictWebcam() {
    try {
      const video = videoRef.current;

      if (video.currentTime === lastWebcamTime) {
        if (subscriber.stream.videoActive === true) {
          window.requestAnimationFrame(predictWebcam);
        }
        return;
      }
      lastWebcamTime = video.currentTime;
      // Do not segmented if imageSegmenter hasn't loaded
      if (imageSegmenter === undefined) {
        return;
      }
      // if image mode is initialized, create a new segmented with video runningMode
      if (runningMode === 'IMAGE') {
        runningMode = 'VIDEO';
        await imageSegmenter.setOptions({
          runningMode: runningMode,
        });
      }
      let startTimeMs = performance.now();

      // Start segmenting the stream.
      imageSegmenter.segmentForVideo(video, startTimeMs, callbackForVideo);
    } catch (error) {
      predictWebcam();
    }
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
    if (subscriber) {
      subscriber.addVideoElement(videoRef.current);
      contextRef.current = canvasRef.current.getContext('2d');
      canvasRef2.current = document.createElement('canvas');
      contextRef2.current = canvasRef2.current.getContext('2d');

      handleVideoResize();
      videoRef.current.addEventListener('resize', handleVideoResize);

      if (mediapipe) {
        createImageSegmenter();
        videoRef.current.addEventListener('loadeddata', predictWebcam);
      }
    }
  }, []);

  if (subscriber) {
    return (
      <div className={`${styles.SubCam}`} onClick={onClick}>
        <video className={`${mediapipe ? styles.video : ''}`} ref={videoRef} autoPlay={true} />
        {/* <video className={`${mediapipe ? styles.video : ''}`} ref={videoRef} autoPlay={true} /> */}
        <canvas className={`${styles.canvas}`} ref={canvasRef} />
        <div
          className={`${styles.border} ${
            current ? styles.current : selected ? styles.selected : ''
          }`}
          style={{
            width: `${videoWidth}px`,
            height: `${videoHeight}px`,
          }}
        ></div>
      </div>
    );
  }
}
