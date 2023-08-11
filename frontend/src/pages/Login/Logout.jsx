//logout
import { removeCookie } from "../../components/Cookie"
import axios from "axios";

function Logout(){
  const accessToken = localStorage.getItem('accessToken');
	const logOut = () => {
    axios.get(
      // 'https://kauth.kakao.com/oauth/logout?logout_redirect_uri=http://localhost:5173/main&client_id=0c75393f80241be4aaf8ebd811934887',
      `http://192.168.111.126:5000/oauth/logout`, 
      {headers: {
        Authorization: `Bearer ${accessToken}`
        }
      }
      )
      .then((response) => {
        console.log("응답 확인", response);
        localStorage.removeItem("accessToken");
        removeCookie('refreshToken'); // 쿠키를 삭제
        location.reload();
        window.location.replace('/')
          })
	};

	return (
        <div>
			<button onClick={logOut}>로그아웃</button>
		</div>
    )
}

export default Logout;