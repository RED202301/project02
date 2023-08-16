import axios from "axios";
import Swal from "sweetalert2";

const base_url = import.meta.env.VITE_SERVER_URL;

function ChangeNickname(){
    const host_URL = base_url;
        // const changeNickname  = () => {
            Swal.fire({
              title: '닉네임을 입력 해 주세요',
              input: 'text',
              confirmButtonText: '등록',
              confirmButtonColor: 'black',
              width: 'auto',
            })
              //닉네임이 입력 됐을 때,
              .then(res => {
                /* Read more about isConfirmed, isDenied below */
                if (res.isConfirmed) {
                  console.log(res.value);
                  axios
                    .put(host_URL + '/api/v1/oauth/change-nickname', {
                      userId: window.localStorage.getItem('userId'),
                      nickname: res.value,
                    }) //api 요청이 성공 했을 때,
                    .then(response => {
                      Swal.fire({
                        title: '닉네임 변경 완료',
                        confirmButtonText: '확인',
                        confirmButtonColor: 'black',
                        width: 'auto',
                      }).then(()=>{
                        location.reload();
                      })
                      console.log(response.data);
                      const nickname = response.data.nickname;
                      window.localStorage.setItem('nickname', nickname);
                    })
                    //api 요청이 실패 했을 때,
                    .catch(err => {
                      console.log(err);
                      Swal.fire({
                        icon: 'warning',
                        iconColor: 'red',
                        title: '닉네임 사용 불가',
                        text: `닉네임을 다시 입력해주세요`,
                        confirmButtonText: '확인',
                        confirmButtonColor: 'black',
                        width: 'auto',
                      })
                    });
                }
              }) //닉네임이 입력 되지 않았을 때,
              .catch(() => {
                
              });
            // }

	return (
        <div>
			{/* <p onClick={changeNickname} style={{'margin':'0px'}}>닉네임 변경</p> */}
		</div>
)}

export default ChangeNickname;