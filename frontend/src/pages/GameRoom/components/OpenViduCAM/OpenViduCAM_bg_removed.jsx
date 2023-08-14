import vision from '@mediapipe/tasks-vision';
import { useEffect, useRef, useState } from 'react';
const { ImageSegmenter, FilesetResolver } = vision;
/** @typedef {import('openvidu-browser').StreamManager} StreamManager  */

export default function OpenViduCAM(
  /** @type {{streamManager:StreamManager, width:number, height:number, handleClick, style}} */ {
    streamManager,
    width,
    height,
    style,
  }
) {
  /** @type {React.MutableRefObject<HTMLVideoElement>} */
  const videoRef = useRef();
  const canvasRef = useRef();
  const contextRef = useRef();
  /** @type {Boolean}*/ const webcamRunning = true;
  /** @type { "IMAGE" | "VIDEO"} */ let runningMode = 'IMAGE';
  /** @type {ImageSegmenter} */ let imageSegmenter;

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
    const canvasCtx = contextRef.current;

    canvasCtx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    const imageData = canvasCtx.getImageData(0, 0, video.videoWidth, video.videoHeight).data;

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
    const video = videoRef.current;
    const canvasCtx = contextRef.current;

    const mask = result.categoryMask.getAsFloat32Array();
    const faceImage = getFaceImage(mask);
    const image = video;
    // canvasCtx.putImageData(faceImage, 0, 0)
    canvasCtx.save();
    canvasCtx.fillStyle = 'white';
    canvasCtx.clearRect(0, 0, video.videoWidth, video.videoHeight);
    canvasCtx.filter = 'opacity(0)';
    canvasCtx.drawImage(image, 0, 0, video.videoWidth, video.videoHeight);
    // Only overwrite existing pixels.
    canvasCtx.globalCompositeOperation = 'destination-atop';

    canvasCtx.filter = 'opacity(0)';

    // canvasCtx.drawImage(faceImage, 0, 0, video.videoWidth, video.videoHeight)
    canvasCtx.putImageData(faceImage, 0, 0);
    // Only overwrite missing pixels.
    canvasCtx.globalCompositeOperation = 'destination-over';

    canvasCtx.drawImage(image, 0, 0, video.videoWidth, video.videoHeight);
    canvasCtx.restore();
    if (webcamRunning === true) {
      window.requestAnimationFrame(predictWebcam);
    }
  }

  const [lastWebcamTime, setLastWebcamTime] = useState(-1);
  // let lastWebcamTime = -1;
  async function predictWebcam() {
    try {
      const video = videoRef.current;
      const canvasCtx = contextRef.current;

      // if (video.currentTime === lastWebcamTime) {
      if (video?.currentTime === lastWebcamTime) {
        if (webcamRunning === true) {
          window.requestAnimationFrame(predictWebcam);
        }
        return;
      }
      // lastWebcamTime = video.currentTime;
      setLastWebcamTime(video.currentTime);
      canvasCtx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
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

  const [vw, setVw] = useState(window.outerWidth);
  const [vh, setVh] = useState(window.outerHeight);
  function handdleResize() {
    setVw(window.outerWidth);
    setVh(window.outerHeight);
    canvasRef.current.width = vw / 4 + vh / 2;
    canvasRef.current.height = ((vw / 4 + vh / 2) * 3) / 4;
  }
  useEffect(() => {
    handdleResize();
    contextRef.current = canvasRef.current.getContext('2d');
    streamManager.addVideoElement(videoRef.current);
    videoRef.current.addEventListener('loadeddata', predictWebcam);
    // (async () => {
    //   videoRef.current.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
    // })();
    window.addEventListener('resize', handdleResize);
    createImageSegmenter();
    return () => {
      window.removeEventListener('resize', handdleResize);
    };
  }, []);

  return (
    <div
      style={{
        ...style,
        width,
        height,
        boxSizing: 'border-box',
      }}
    >
      <canvas
        width={width}
        height={height}
        ref={canvasRef}
        style={{ position: 'absolute', top: 'calc(var(--unit)*0.1)' }}
      />
      <video
        ref={videoRef}
        autoPlay={true}
        style={{
          ...style,
          width,
          height,
          boxSizing: 'border-box',
          display: 'none',
          position: 'absolute',
        }}
      />
    </div>
  );
}
