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
function CardX({ name, point, imageUrl, card_Description }) {
  return (
    <div className='cardx'>
      <div className='middle-section'>{point} yellow stars</div>
      <div className='content'>

        <div className='cardtitle'>{name}</div>
        {[...Array(point)].map((_, index) => (
          <span key={index} className="yellow-star">★</span>
        ))}
        <div className='shortdiv'>
        <img src={imageUrl} alt='카드 이미지' style={{display:'flex', width:'180px', height:'200px', borderRadius: '10px'}}/>
        </div>
        <div className='shortdiv'>{card_Description}</div>
      </div>
    </div>
  );
}

function Deckmake(props) {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState('');
  const [card_Description, setShortDescription] = useState('');
  const [selectedStars, setSelectedStars] = useState(0);
  const [point, setPoint] = useState(0);
  const [showCard, setShowCard] = useState(false);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleStarClick = (starIndex) => {
    setSelectedStars(starIndex + 1);
  };

  const handleCardUpload = () => {
    if (selectedImage) {
      console.log('선택한 이미지:', selectedImage.name);
      setName(document.getElementById('name').value);
      setShortDescription(document.getElementById('card_Description').value);
      console.log('선택된 별의 갯수:', selectedStars);

      setPoint(selectedStars);
      setShowCard(true); // 미리보기를 보이도록 설정
    } else {
      console.log('이미지를 선택해주세요.');
    }
  };

  const handleReset = () => {
    setShowCard(false); // 다시 만들기 버튼을 누르면 미리보기를 숨김
  };

  return (
    <div className='makebox'>
      <h3>카드 만들기</h3>
      <input id='name' className='showingbox' placeholder='이름' />

      <div className='star-container'>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`star ${selectedStars > index ? 'yellow' : ''}`}
            onClick={() => handleStarClick(index)}
          >
            ★
          </div>
        ))}
      </div>

      <div className='image-container'>
        <div className='image-box' onClick={handleImageClick}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt='선택한 이미지'
              style={{ maxWidth: '100%', maxHeight: '100%', marginLeft: '3px', marginTop: '3px' }}
            />
          ) : (
            <p className='imagebox'>카드 사진</p>
          )}
        </div>
      </div>

      <input
        type='file'
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      <input id='card_Description' className='showingbox' placeholder='짤막한 글' />

      <button onClick={showCard ? handleReset : handleCardUpload} className='button'>
        {showCard ? '다시 만들기' : '미리보기'}
      </button>

      <div className='margincard'>
        {showCard && name && imageUrl && card_Description && (
          <div>
            <CardX name={name} imageUrl={imageUrl} card_Description={card_Description} point={point} />
          </div>
        )}
      </div>
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