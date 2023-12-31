//logout
import { removeCookie } from '../../components/Cookie';
import axios from 'axios';
import Swal from 'sweetalert2';

function Signout() {
  const accessToken = localStorage.getItem('accessToken');
  const signOut = () => {
    Swal.fire({
      icon: 'warning',
      iconColor: 'red',
      title: '회원탈퇴',
      // text: '탈퇴 시 본인이 직접 제작한 덱도 지우시겠습니까?',
      input: 'checkbox',
      inputValue: true,
      inputPlaceholder: '탈퇴 시 본인이 직접 제작한 덱도 지우시겠습니까?',
      confirmButtonText: '탈퇴',
      confirmButtonColor: 'black',
    })
      //인풋이 입력됐을 때,
      .then(res => {
        if (res.isConfirmed) {
          if (res.value){
            res.value = true
          }
          else {
            res.value = false
          }
          axios
              .delete(`https://i9e202.p.ssafy.io/api/v1/oauth/`,{
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
                data:{
                  wantToDeleteDeck: res.value,
                },
              })
              .then(response => {
                console.log('응답 확인', response);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('userId');
                localStorage.removeItem('nickname');
                removeCookie('refreshToken'); // 쿠키를 삭제
                Swal.fire({
                  title: '탈퇴 완료',
                  confirmButtonText: '확인',
                  confirmButtonColor: 'black',
                }).then(()=>{                  
                  location.reload();
                  window.location.replace('/');
                })

              }).catch(e=>{
                console.log('카드 삭제 요청 실패', e)
              });
  }})}

  return (
    <div>
      <p onClick={signOut} style={{ margin: '0px' }}>
        회원탈퇴
      </p>
    </div>
  );
}

export default Signout;
