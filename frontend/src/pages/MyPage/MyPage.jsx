import './MyPage.css';
import { useState } from 'react';

function MyPage(){
    return (
        <div className="MyPage">
            마이 페이지

      <div className="gridX">
      <div>
      <Profile></Profile>
      </div>
      <div className='deckmargin' > 
      <Deckget>

  </Deckget>
  </div>
  </div>
        </div>
    )
}


function Deckget() {

  return (
    <div className='introboxs' style={{ overflowY: 'auto', height: '600px' }}>
   
      
      <h3>내 덱 보관함</h3>
      <p> 
      </p>
    </div>

  
  )
}


function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [username, setUsername] = useState('닉네임'); 

  const playcount = '100판';

  const handleInputChange = (event) => {
    setNewUsername(event.target.value); 
  };

  const handleModalConfirm = () => {
    setUsername(newUsername);
    setIsModalOpen(false);
  };

  return (
    <div className='userprofile'>
      <div className='gridX'>
        <p className='profilebox2'>프로필 사진</p>
        <p className='nickname'>{username}</p>
        <div className='gridrow'>
          <button className='buttonoption' onClick={() => setIsModalOpen(true)}>변경</button>
          <button className='buttonoption'>탈퇴</button>
        </div>
      </div>
      <div className='grids'>

        <Cardimg />
        <div className='margin'>
          
          {/* <p className='exp'>
            <span className='expbar' style={{width: '75%'}}></span>
          </p> */}
          <p className='tran'>
            <span>플레이 횟수</span>
            <span className='trans'>{playcount}</span>
          </p>
        </div>
      </div>


      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <h2>닉네임 변경</h2>
            <input
              type='text'
              value={newUsername}
              onChange={handleInputChange}
              placeholder='새로운 닉네임을 입력하세요'
            />
            <button onClick={handleModalConfirm}>확인</button>
            <button onClick={() => setIsModalOpen(false)}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
}


function Cardimg() {
  return (
    <div>
    <p className='cardimg'>카드사진</p>
    </div>
  )
}
// function Profile(props) {
//   return (
//     <div>

//     </div>
//   )
// }



export default MyPage;