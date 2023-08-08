import React, { Component } from 'react';
import {
    ImageSegmenter,
    FilesetResolver,
  } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.2';
  
export default class OpenViduVideoComponent extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          imageSegmenter: null,
          labels: [],
          webcamRunning: false,
          runningMode: 'IMAGE',
        };
    
        this.canvasClickRef = React.createRef();
        this.videoRef = React.createRef();
        this.canvasRef = React.createRef();
        this.canvasCtxRef = React.createRef();
    
        this.legendColors = [
          [255, 0, 0, 0], // Vivid Yellow
          [0, 0, 0, 0], // Strong Purple
          // ... 나머지 레전드 컬러 배열
        ];
      }
    
      componentDidMount() {
        if (this.props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
            this.createImageSegmenter();
        }
      }
    
      createImageSegmenter = async () => {
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
            runningMode: this.state.runningMode,
            outputCategoryMask: true,
            outputConfidenceMasks: false,
          }
        );
    
        this.setState({
          imageSegmenter: newImageSegmenter,
          labels: newImageSegmenter.getLabels(),
        });
      };
    
      handleClick = async (event) => {
        if (!this.state.imageSegmenter) {
          return;
        }
        const canvasClick = this.canvasClickRef.current;
        const cxt = canvasClick.getContext('2d', { willReadFrequently: true });
        canvasClick.width = event.target.naturalWidth;
        canvasClick.height = event.target.naturalHeight;
        const image = new Image();
        image.src = event.target.src;
        image.onload = () => {
          cxt.clearRect(0, 0, canvasClick.width, canvasClick.height);
          cxt.drawImage(image, 0, 0, canvasClick.width, canvasClick.height);
          event.target.style.opacity = 0;
    
          if (this.state.runningMode === 'VIDEO') {
            this.setState({ runningMode: 'IMAGE' }, () => {
              this.state.imageSegmenter.setOptions({
                runningMode: 'IMAGE',
              });
            });
          }
    
          this.state.imageSegmenter.segment(image, this.callback);
        };
      };
    
      callback = (result) => {
        const cxt = this.canvasClickRef.current.getContext('2d', { willReadFrequently: true });
        const { width, height } = result.categoryMask;
        const imageData = cxt.getImageData(0, 0, width, height).data;
        cxt.clearRect(0, 0, width, height);
        const mask = result.categoryMask.getAsUint8Array();
        let category = ''; // 카테고리 변수 초기화
        for (let i in mask) {
          if (mask[i] > 0) {
            category = this.state.labels[mask[i]];
          }
          const legendColor = this.legendColors[mask[i] % this.legendColors.length];
          imageData[i * 4] = (legendColor[0] + imageData[i * 4]) / 2;
          imageData[i * 4 + 1] = (legendColor[1] + imageData[i * 4 + 1]) / 2;
          imageData[i * 4 + 2] = (legendColor[2] + imageData[i * 4 + 2]) / 2;
          imageData[i * 4 + 3] = (legendColor[3] + imageData[i * 4 + 3]) / 2;
        }
        const uint8Array = new Uint8ClampedArray(imageData.buffer);
        const dataNew = new ImageData(uint8Array, width, height);
        cxt.putImageData(dataNew, 0, 0);
        const p = event.target.parentNode.getElementsByClassName(
          'classification'
        )[0];
        p.classList.remove('removed');
        p.innerText = 'Category: ' + category;
      };
    
      callbackForVideo = (result) => {
        const imageData = this.canvasCtxRef.current.getImageData(
          0,
          0,
          this.videoRef.current.videoWidth,
          this.videoRef.current.videoHeight
        ).data;
        let j = 0;
        const mask = result.categoryMask.getAsFloat32Array();
        for (let i = 0; i < mask.length; ++i) {
          const maskVal = Math.round(mask[i] * 255.0);
          const legendColor = this.legendColors[maskVal % this.legendColors.length];
    
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
          this.videoRef.current.videoWidth,
          this.videoRef.current.videoHeight
        );
        this.canvasCtxRef.current.putImageData(dataNew, 0, 0);
        if (this.state.webcamRunning === true) {
          window.requestAnimationFrame(this.predictWebcam);
        }
      };
    
      enableCam = async () => {
        if (!this.state.imageSegmenter) {
          return;
        }
    

        this.setState({ webcamRunning: true });

    
        const constraints = {
          video: true,
        };
    
        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          this.videoRef.current.srcObject = stream;
          this.videoRef.current.addEventListener('loadeddata', this.predictWebcam);
    
          this.canvasCtxRef.current = this.canvasRef.current.getContext('2d', { willReadFrequently: true });
        } catch (error) {
          console.warn('getUserMedia() is not supported by your browser');
        }
      };
    
      predictWebcam = () => {
        if (
          this.videoRef.current.currentTime ===
          this.videoRef.current.lastWebcamTime
        ) {
          if (this.state.webcamRunning === true) {
            window.requestAnimationFrame(this.predictWebcam);
          }
          return;
        }
        this.videoRef.current.lastWebcamTime = this.videoRef.current.currentTime;
        this.canvasCtxRef.current.drawImage(
          this.videoRef.current,
          0,
          0,
          this.videoRef.current.videoWidth,
          this.videoRef.current.videoHeight
        );
        if (!this.state.imageSegmenter) {
          return;
        }
        if (this.state.runningMode === 'IMAGE') {
          this.setState({ runningMode: 'LIVE_STREAM' }, () => {
            this.state.imageSegmenter.setOptions({
              runningMode: 'LIVE_STREAM',
            });
          });
        }
        const startTimeMs = performance.now();
        this.state.imageSegmenter.segmentForVideo(
          this.videoRef.current,
          startTimeMs,
          this.callbackForVideo
        );
      };
    

    componentDidUpdate(props) {
        if (props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

  render() {
    const { webcamRunning } = this.state;
  return (
    <div style={{ display: 'flex', width: '200px', height: '200px', position: 'relative' }}>
        <section id="demos" className="invisible">
          <div className="webcam-container">
            <canvas
              id="canvas"
              ref={this.canvasRef}
              width="300px"
              height="300px"
              
              style={{ position: 'absolute', zIndex: 1 }}
            ></canvas>
            <div className="webcam" style={{ position: 'relative', zIndex: 2 }}>

              {/* Display local webcam video */}
              <video
                id="webcam"
                ref={this.videoRef}
                autoPlay
                style={{ display: 'none', left: '200px' }}
              ></video>
              <button
                id="webcamButton"
                className="mdc-button mdc-button--raised"
                onClick={this.enableCam}
              >
                <span className="mdc-button__ripple"></span>
                <span className="mdc-button__label">
                  {webcamRunning ? '세그멘테이션 비활성화' : '웹캠 활성화'}
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>
  );
}}

export function UserVideoComponent({ streamManager }) {

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
