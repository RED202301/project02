import { Link, useNavigate } from 'react-router-dom';
import 카카오로그인 from './카카오로그인.png';
import { motion } from 'framer-motion';
import axios from "axios";
import { useEffect } from "react";
import { setCookie } from "../../components/Cookie";

function Login2() {
  const host_URL = 'http://192.168.111.126:5000'
  // // 인가코드 받아오기
  const code = new URL(window.location.href).searchParams.get("code");

  const navigate = useNavigate();
  useEffect(() => {
    //////////////////////////////////////////////////////////////
    //       백엔드로부터 인가코드 넘기고 jwt 토큰 받기
    ////////////////////////////////////////////////////////////
    (async () => {
      try {
        const res = await axios
          // 백엔드 주소 뒤에 인가코드 붙여서 GET 설정
          // 백엔드는 이 주소를 통해 뒤에 붙여져있는 인가코드를 전달 받게 된다.
          .get(
            host_URL + `/oauth/login?code=${code}`
          )
          // 백엔드 쪽에서 보내준 응답 확인
          .then((response) => {
            console.log("응답 확인", response);
            // 이때,
            const accessToken = response.data.accessToken
            const refreshToken = response.data.refreshToken;

            window.localStorage.setItem("accessToken", accessToken);
            setCookie("refreshToken", refreshToken, {
              httpOnly: true,
            })
            // console.log(accesstoken);
            // 만약, 유저정보를 잘 불러왔다면 navigate를 사용해 프론트엔드에서 설정한 마이페이지 경로를 설정해서 이동시킨다.
            if (accessToken) {
              navigate("../main");
          }})
        console.log(res);
      } catch (e) {
        // 에러 발생 시, 에러 응답 출력
        console.error(e);
      }
    })();
  }, []);

  return (
    <motion.div
      initial={{ x: -500 }}
      animate={{ x: 0 }}
      // transition={{
      //     type: "tween",
      //     duration: "2",
      //     delay: "0.1"
      // }}
      className="Login"
    >
      <div className="Login2">
        <div className="Logo">
          <h1>Login!</h1>
        </div>
        <div className="kakao">
            <img className="login_img" src={카카오로그인} alt="" />
        </div>
        <div className="back">
          <Link to="/">
            <span>➡</span>
          </Link>
        </div>
      </div>
      <motion.div initial={{ x: -100 }} animate={{ x: 0 }} className="zzz">
        <div className="Landing">
          <div className="LOGO">
            <h1>Ssafish!</h1>
          </div>
          <div className="PIN">
            <input className="input" placeholder="게임 PIN"></input>
            <Link to="">
              <button>확인</button>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Login2;
