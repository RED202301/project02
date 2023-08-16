import VideoToggler from '../Buttons/ToggleButtons/VideoToggler';
import AudioToggler from '../Buttons/ToggleButtons/AudioToggler';

export default function PubTogglers({ publisher, setWebcamRunning }) {
  function toggleVideo() {
    setWebcamRunning(webcamRunning => !webcamRunning);
    publisher.stream.videoActive ? publisher.publishVideo(false) : publisher.publishVideo(true);
  }

  function toggleAudio() {
    publisher.stream.audioActive ? publisher.publishAudio(false) : publisher.publishAudio(true);
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
