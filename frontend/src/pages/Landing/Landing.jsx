import './Landing.css';
import {Link, useNavigate} from'react-router-dom';
import {motion} from 'framer-motion';
import {useState} from 'react'
import axios from 'axios';
import Swal from "sweetalert2";

function Landing(){
  const host_URL = "http://192.168.30.103:5001"
  const navigate = useNavigate();
  const [pinNumber, setPIN] = useState('');
  const [roomId, setRoomId] = useState(null);
  const savePIN = event => {
    setPIN(event.target.value);
    // console.log(event.target.value);
  };
  //핀번호 입력창에 핀번호 입력하고 확인 버튼(get 요청)
  const buttonClick = () => {
    console.log({ pinNumber })
    axios.get(host_URL+`/api/v1/room/id/${pinNumber}`)
      .then((response) => {
        console.log(response.data)
        // setRoomId(response.data.roomId);
        const roomId = response.data.roomId
        // const pinNumber = response.data.pinNumber
        window.sessionStorage.setItem('roomId', roomId)
        // window.sessionStorage.setItem('pinNumber', pinNumber)

        //roomId를 받는데 성공했다면 닉네임 입력 창 띄워줌
        if (roomId){
          Swal.fire({
            text: '닉네임을 입력 해 주세요',
            input:'text',
            showCancelButton: true,
            confirmButtonText: "등록",
            cancelButtonText: "취소",
             }).then((res) => {
              // confirm 버튼을 눌렀다면 입력값을 가지고 post 요청
              if (res.isConfirmed) {
                console.log(res.value)
                axios.post(host_URL+"/api/v1/user",{
                nickname: res.value}
                )
                .then((response) => {
                  console.log(response.data)
                  const userId = response.data.userId
                  window.sessionStorage.setItem('userId', userId)
                  if (userId) {
                    navigate('/room')
                  }
              }).catch((err)=>{console.log(err)})
            }})
       }
      })
      .catch((err) => { 
        console.log(err)
        //실패 시, 접속 실패 창
        Swal.fire({
          icon: "warning",
          title: "접속 실패",
          text: `핀번호를 다시 확인 해 주세요`,
          confirmButtonText: "확인",})
       })
  };
  return (
    <motion.div>
      <div className="Landing">
        <div className='LOGO'>
          <h1>Ssafish!</h1>
        </div>
        <div className="PIN">
          <div className="container">
            <input required="게임 PIN" type="text" name="text" className="input" value={pinNumber} onChange={savePIN} />
            <label className="label">게임 PIN</label>
          </div>
          <Link to=''>
            <button className='btn' onClick={buttonClick}>
              확인
            </button>
          </Link>
        </div>
        <div className="LOGTUTO">
          <Link to='/Login'>
            <span>Login</span>
          </Link>
          |
          <Link to='/Tutorial'>
            <span>Tutorial</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}


export default Landing;