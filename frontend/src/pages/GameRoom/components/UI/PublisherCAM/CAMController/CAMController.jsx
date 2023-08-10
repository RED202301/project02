import AudioToggler from './Togglers/AudioToggler';
import VideoToggler from './Togglers/VideoToggler';
import styles from './CAMController.module.scss';

/** @typedef {import('openvidu-browser').Publisher} Publisher */

export default function CAMcontroller(/** @type {{publisher:Publisher}} */ { publisher }) {
  return (
    <div className={`${styles.CAMController}`}>
      <AudioToggler {...{ publisher }} />
      <VideoToggler {...{ publisher }} />
    </div>
  );
}
