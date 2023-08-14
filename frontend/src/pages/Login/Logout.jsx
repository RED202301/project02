//logout
import { removeCookie } from "../../components/Cookie"
import axios from "axios";
import Swal from "sweetalert2";

function Logout(){
  const accessToken = localStorage.getItem('accessToken');
	const logOut = () => {
    axios.get(
      // 'https://kauth.kakao.com/oauth/logout?logout_redirect_uri=http://localhost:5173/main&client_id=0c75393f80241be4aaf8ebd811934887',
      `https://i9e202.p.ssafy.io/api/v1/oauth/logout`, 
      {headers: {
        Authorization: `Bearer ${accessToken}`
        }
      }
      )
      .then((response) => {
        console.log("응답 확인", response);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("nickname");
        removeCookie('refreshToken'); // 쿠키를 삭제
        Swal.fire({
          title: '로그아웃 완료',
          confirmButtonText: '확인',
          confirmButtonColor: 'black',
          width: 'auto',
        }).then(()=>{                  
          location.reload();
          window.location.replace('/');
        })
          })
	};

	return (
        <div>
			<p onClick={logOut} style={{'margin':'0px'}}>로그아웃</p>
		</div>
    )
}

export default Logout;