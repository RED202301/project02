import AudioToggler from './AudioToggler/AudioToggler';
import VideoToggler from './VideoToggler/VideoToggler';
import LeaveButton from './LeaveButton/LeaveButton';

export default function Controller({ streamManager, session }) {
  return (
    <div>
      <LeaveButton session={session} />
      <AudioToggler {...{ streamManager }} />
      <VideoToggler {...{ streamManager }} />
    </div>
  );
}
