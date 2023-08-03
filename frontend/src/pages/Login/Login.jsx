import './Login.css';
import { Link} from 'react-router-dom';
import 카카오로그인 from './카카오로그인.png';
import { motion } from 'framer-motion';

function Login() {
  const REST_API_KEY = '0c75393f80241be4aaf8ebd811934887'; // RestAPI 키
  const REDIRECT_URI = 'http://localhost:5173/login2'; // redirect 주소
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;

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
          <Link to={KAKAO_AUTH_URI}>
            <img className="login_img" src={카카오로그인} alt="" />
          </Link>
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

export default Login;
