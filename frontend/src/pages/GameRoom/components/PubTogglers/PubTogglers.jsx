import VideoToggler from '../Buttons/ToggleButtons/VideoToggler';
import AudioToggler from '../Buttons/ToggleButtons/AudioToggler';

/** @typedef {import("openvidu-browser").Publisher} Publisher */

export default function PubTogglers(
  /** @type {{publisher:Publisher}}*/ { publisher, setWebcamRunning }
) {
  function toggleVideo() {
    setWebcamRunning(webcamRunning => !webcamRunning);
    publisher.publishVideo(!publisher.stream.videoActive);
  }

  function toggleAudio() {
    publisher.publishAudio(!publisher.stream.audioActive);
  }

  if (publisher) {
    return (
      <>
        <VideoToggler onClick={toggleVideo} videoActive={publisher.stream.videoActive} />
        <AudioToggler onClick={toggleAudio} audioActive={publisher.stream.audioActive} />
      </>
    );
  }
}
