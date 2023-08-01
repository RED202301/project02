import './CardFactory.css';
import { useRef, useState } from 'react';

function CardFactory(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false)
    const [isModalOpens, setIsModalOpens] = useState(false);
    const openModals = () => setIsModalOpens(true);
    const closeModals = () => setIsModalOpens(false)
    return (
        <div className="CardFactory">
            카드 공방
      <div className="grid">
      
      <div>
      <Deckin></Deckin>
      <button id="silverborder" onClick={openModals}  >덱 등록하기</button>
      <ModalX isOpens={isModalOpens} closeModals={closeModals} className='modalbox'>
        <Deckintroduce></Deckintroduce>
      </ModalX>
      <button id="silverborders">대표 카드지정</button>
      </div>
      
      <div >
      <Selectin></Selectin>
      <button id="silverborder" onClick={openModal}>카드 만들기</button>
      <Modal isOpen={isModalOpen} closeModal={closeModal} className='modalbox'>
        <Deckmake></Deckmake>
      </Modal>
      </div>
      </div>
        </div>
    )
}

function Deckin(props) {
    return (
      <div>
        
        <h4 className='bold'>덱에 포함시킬 카드</h4>
        
        <div id="factory">

        </div>
        </div>
    )
  }


function Selectin(props) {
    return (
      <div>
        <h4 className="bold">선택 가능한 카드</h4>
        <div id="factory">
        </div>
      </div>
    )
  }

  function Modal({isOpen, closeModal}) {
    return (
      <div style={{display:isOpen ? "block": "none"}} className='modalbox'>
        <button onClick={closeModal} className='buttonX'>X</button>
        <Deckmake></Deckmake>
        <div className='buttoncontain'>
        
        <button onClick={closeModal} className='button'>등록하기</button>
        </div>
      </div>
    )
  }

  function ModalX({isOpens, closeModals}) {
    return (
      <div style={{display:isOpens ? "block": "none"}} className='modalbox'>
        <button onClick={closeModals} className='buttonX'>X</button>
        <Deckintroduce></Deckintroduce>
        <div className='buttoncontain'>
        
        <button onClick={closeModals} className='button'>등록하기</button>
        </div>
      </div>
    )
  }

// 카드 만들기, 상세 모달



function Deckmake(props) {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click(); // input 요소 클릭 이벤트를 발생시킵니다.
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return; // 파일이 선택되지 않은 경우

    // 파일을 업로드하거나 원하는 작업을 수행합니다.
    // 이 예시에서는 선택한 파일의 이름을 출력하는 것으로 대체합니다.
    console.log('선택한 파일:', file.name);
  };

  return (
    <div className='makebox'>
      <h3>카드 만들기</h3>
      <input className='showingbox' placeholder='이름' />
      <p className='imagebox' onClick={handleImageClick}>카드 사진</p>
      <input
        type='file'
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      <input className='showingbox' placeholder='짤막한 글' />
      <div className='buttoncontain'></div>
    </div>
  );
}




  
  function Deckintroduce(props) {
    return (
      <div className='makebox'>
        <h3>덱 등록하기</h3>
        <input className='showingbox' placeholder='이름'/>
  
    <input className='introducebox' placeholder='덱 소개글'/>

    </div>
  
    
    )
  
  }





export default CardFactory;