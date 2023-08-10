import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useEffect } from 'react';
import { setCookie } from '../../components/Cookie';
import './kakaoLogin.css';
import Swal from 'sweetalert2';

const base_url = import.meta.env.VITE_SERVER_URL;
function Login2() {
  // const host_URL = 'http://192.168.30.193:5001'
  const host_URL = base_url;
  // // 인가코드 받아오기
  const code = new URL(window.location.href).searchParams.get('code');

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
          .get(host_URL + `/api/v1/oauth/login?code=${code}`)
          // 백엔드 쪽에서 보내준 응답 확인
          .then(response => {
            console.log('응답 확인', response);
            // 이때,
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;
            const userId = response.data.userId;
            const nickname = response.data.nickname;

            window.localStorage.setItem('accessToken', accessToken);
            window.localStorage.setItem('nickname', nickname);
            window.localStorage.setItem('userId', userId);
            setCookie('refreshToken', refreshToken, {
              httpOnly: true,
            });
            // console.log(accesstoken);
            // 만약, 유저정보를 잘 불러왔다면 navigate를 사용해 프론트엔드에서 설정한 마이페이지 경로를 설정해서 이동시킨다.
            // 닉네임이 null이라면, 닉네임 등록 후 메인페이지 / 닉네임이 있다면, 바로 메인페이지
            if (!nickname) {
              Swal.fire({
                text: '닉네임을 입력 해 주세요',
                input: 'text',
                confirmButtonText: '등록',
              })
                //닉네임이 입력 됐을 때,
                .then(res => {
                  /* Read more about isConfirmed, isDenied below */
                  if (res.isConfirmed) {
                    console.log(res.value);
                    axios
                      .put(host_URL + '/oauth/change-nickname', {
                        userId: window.localStorage.getItem('userId'),
                        nickname: res.value,
                      }) //api 요청이 성공 했을 때,
                      .then(response => {
                        console.log(response.data);
                        const nickname = response.data.nickname;
                        window.localStorage.setItem('nickname', nickname);
                        if (accessToken) {
                          navigate('../main');
                        }
                        //api 요청이 실패 했을 때,
                      })
                      .catch(err => {
                        console.log(err);
                        navigate('../');
                      });
                  }
                }) //닉네임이 입력 되지 않았을 때,
                .catch(() => {
                  navigate('../');
                });
            }
            //닉네임이 원래 등록되어 있을 때,
            else {
              if (accessToken) {
                navigate('../main');
              }
            }
          });
        console.log(res);
      } catch (e) {
        //로그인 자체가 실패 했을 때,
        // 에러 발생 시, 에러 응답 출력
        console.error('로그인 자체 실패', e);
        navigate('../');
      }
    })();
  }, []);

  return (
    <motion.div
      // initial={{ x: -500 }}
      // animate={{ x: 0 }}
      // transition={{
      //     type: "tween",
      //     duration: "2",
      //     delay: "0.1"
      // }}
      className="kakaoLogin"
    >
      <div
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        className="wheel-and-hamster"
      >
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
          </div>
        </div>
        <div className="spoke"></div>
      </div>

      <div className="go2home">
        <Link to="/">Home</Link>
      </div>
    </motion.div>
  );
}

export default Login2;
