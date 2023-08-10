//logout
import { removeCookie } from '../../components/Cookie';
import axios from 'axios';

function Signout() {
  const accessToken = localStorage.getItem('accessToken');
  const signOut = () => {
    axios
      .delete(`https://i9e202.p.ssafy.io/api/v1/oauth/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        console.log('응답 확인', response);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('nickname');
        removeCookie('refreshToken'); // 쿠키를 삭제
        location.reload();
        window.location.replace('/');
      });
  };

  return (
    <div>
      <p onClick={signOut} style={{ margin: '0px' }}>
        회원탈퇴
      </p>
    </div>
  );
}

export default Signout;
