import UserVideoComponent from '../UserVideoComponent/UserVideoComponent';
import Controller from './Controller/Controller';

export default function Publisher({ streamManager, session }) {
  return (
    <div>
      <Controller {...{ streamManager, session }} />
      <UserVideoComponent {...{ streamManager }} />
    </div>
  );
}
