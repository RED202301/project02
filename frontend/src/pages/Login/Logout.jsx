//logout
import { removeCookie } from "../../components/Cookie"
import axios from "axios";

function Logout(){
	const logOut = () => {
        localStorage.removeItem("accessToken");
		removeCookie('refreshToken'); // 쿠키를 삭제
		axios.get(
            `http://192.168.30.193:8080/oauth/logout`
          )
          .then((response) => {
            console.log("응답 확인", response);
          })
        location.reload();
        window.location.replace('/')
	};

	return (
        <div>
			<button onClick={logOut}>로그아웃</button>
		</div>
    )
}

export default Logout;