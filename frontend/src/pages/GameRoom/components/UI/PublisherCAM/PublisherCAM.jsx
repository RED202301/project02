import CAMcontroller from './CAMController/CAMController';
import OpenViduCAM from '../../OpenViduCAM/OpenViduCAM_origin';
import styles from './PublisherCAM.module.scss';

/** @typedef {import('openvidu-browser').Publisher} Publisher  */

export default function PublisherCAM(/** @type {{publisher:Publisher}} */ { publisher }) {
  return publisher ? (
    <div className={`${styles.PublisherCAM}`}>
      <CAMcontroller {...{ publisher }} />
      <OpenViduCAM streamManager={publisher} />
    </div>
  ) : (
    <></>
  );
}
