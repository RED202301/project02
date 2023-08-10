import CAMcontroller from './CAMController/CAMController';
import OpenViduCAM from '../../OpenViduCAM/OpenViduCAM';
import styles from './PublisherCAM.module.scss';

/** @typedef {import('openvidu-browser').Publisher} Publisher  */

export default function PublisherCAM(/** @type {{publisher:Publisher}} */ { publisher }) {
  return (
    <div className={`${styles.PublisherCAM}`}>
      <CAMcontroller {...{ publisher }} />
      <OpenViduCAM streamManager={publisher} />
    </div>
  );
}
