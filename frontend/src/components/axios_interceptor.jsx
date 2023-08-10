import axios from "axios";
import { removeCookie, getCookie, setCookie } from "./Cookie";


const instance = axios.create({
    // 상대적인 URL을 인스턴스 메서드에 전달하려면 baseURL을 설정하는 것은 편리하다.
    // URL(서버 주소) 예시 - http://127.0.0.1:5500
    baseURL: 'https://i9e202.p.ssafy.io',
    // 요청이 timeout보다 오래 걸리면 요청이 중단된다.
    timeout: 1000,
  });

// 요청 인터셉터
  instance.interceptors.request.use(
    (config) => {
      // getToken() - 클라이언트에 저장되어 있는 액세스 토큰을 가져오는 함수
      const accessToken =  window.localStorage.gettItem("accessToken");
      config.headers['Content-Type'] = 'application/json';
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );
//응답 인터셉터
  instance.interceptors.response.use(
    (response) => {
      if (response.status === 404) {
        console.log('404 페이지로 넘어가야 함!');
      }
      return response;
    },
    async (error) => {
            const prevRequest = error.config;
            if (error.response?.status === 401) {
                const preRefreshToken = getCookie('refreshToken');
                if (preRefreshToken){
                        axios.post('api/user/token',{
                            refresh_token: preRefreshToken,
                        })
                        .then(async(res)=>{
                            //새로 받은 토큰 저장
                            window.localStorage.setItem("accessToken", res);
                            setCookie('refreshToken', res ,{
                                httpOnly: true
                            });
                            //header 새로운 토큰으로 재설정
                            prevRequest.headers.Authorization = `Bearer ${window.localStorage.getItem("accessToken")}`;
                            // 실패했던 기존 request 재시도
                            return await axios(prevRequest);                            
                        })
                        .catch((e)=>{
                            // 토큰 재발행 또는 기존 요청 재시도 실패 시 기존 토큰 제거
                            localStorage.removeItem("accessToken");
                            removeCookie('refreshToken');
                            window.location.href = '/';
                            
                            return new Error(e);
                        });
                    }
                    return axios.post('api/user/token',{
                        refresh_token: preRefreshToken,
                    });
        }else{
            throw new Error('There is no refresh token');
                }
            }
);
                