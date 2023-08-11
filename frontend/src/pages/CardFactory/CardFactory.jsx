import './CardFactory.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
// import CardD from './CardD';
// import cardE from '../../Card/Card'
function CardFactory(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false)
    const [isModalOpens, setIsModalOpens] = useState(false);
    const openModals = () => setIsModalOpens(true);
    const closeModals = () => setIsModalOpens(false)
    const [res, setRes] = useState([''])
    const userId= 13675
  

    function fetchSomeData() {
      axios.get(`https://i9e202.p.ssafy.io/api/card/${userId}`)
        .then(response => {
          console.log('GET 요청 성공:', response.data);
          setRes(response.data)
          console.log(res)
        
          // setFetchImg(response.data.mainImgUrl);
          // setTitle(response.data.mainTitle)
        })
        .catch(error => {
          console.error('GET 요청 실패:', error);
        });
    }
    
    // console.log(res.data)
    return (
        <div className="CardFactory">

      {/* <CardD /> */}
      <div className="grid">
      {/* <cardE></cardE> */}
      <div>
      <Deckin></Deckin>
      <button id="silverborder" onClick={openModals}  >덱 등록하기</button>
      <ModalX isOpens={isModalOpens} closeModals={closeModals} className='modalbox'>
        <Deckintroduce></Deckintroduce>
      </ModalX>
      <button id="silverborders">대표 카드지정</button>
      </div>
      {/* <div><CardL
      maTitle={maTitle}
      img={img}
      stpoint={stpoint}
      cscardDescription={cscardDescription}
    /></div> */}
      <div >
      <Selectin res={res}></Selectin>
      <button id="silverborder" onClick={openModal}>카드 만들기</button>
      <button onClick={fetchSomeData}>카드 불러오기</button>
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
        
        <div className="factory">

        </div>
        </div>
    )
  }


function Selectin({res}) {
    return (
      <div>
        <h4 className="bold">선택 가능한 카드</h4>
        <div className="factory">
          <CardD res={res} />
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
        <div className='star-container'>
        {[...Array(point)].map((_, index) => ( 
          <span key={index} className="yellow-star">★</span>
        ))}
      </div>
        <div className='shortdiv'>
        <img src={imageUrl} alt='카드 이미지' style={{display:'flex', width:'180px', height:'200px', borderRadius: '10px'}}/>
        </div>
        <div className='shortdiv'>{card_Description}</div>
      </div>
    </div>
  );
}



function CardD({ res }) {
  const rows = [];
  for (let i = 0; i < res.length; i += 3) {
    const row = res.slice(i, i + 3);
    rows.push(row);
  }

  return (
    <div>
      {rows.map((row, rowIndex) => (
        <ul
          key={rowIndex}
          style={{
            display: 'flex',
            marginLeft: '-3%',
            marginTop: rowIndex > 0 ? '20px' : '0',
          }}
        >
          {row.map((data, index) => (
            <div className='cardd' key={index} style={{ marginTop:'2%', marginLeft: '2%' }}>
              {/* <div className='middle-section'>{data.point} yellow stars</div> */}
              <div className='content'>
                <div className='cardtitled'>{data.mainTitle}</div>
                <div className='star-container'>
                  {[...Array(data.point)].map((_, index) => (
                    <span key={index} className='yellow-stard'>
                      ★
                    </span>
                  ))}
                </div>
                <img
                  src={data.mainImgUrl}
                  alt=''
                  style={{
                    display: 'flex',
                    marginTop:'2vh',
                    width: '10vw',
                    height: '20vh',
                    borderRadius: '10px',
                    marginLeft:'1.5%'

                  }}
                />
                {/* <p>Content : {data.cardDescription}</p> */}
              </div>
            </div>
          ))}
        </ul>
      ))}
    </div>
  );
}





function Deckmake(props) {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState('');
  const [card_Description, setCardDescription] = useState('');
  const [selectedStars, setSelectedStars] = useState(0);
  const [point, setPoint] = useState(0);
  const [showCard, setShowCard] = useState(false);
  // const header = {
  //   "Content-Type": "multipart/form-data",
  // };
  const userId = 13675;
  
  const handleImageClick = () => {
    fileInputRef.current.click();
    
  };
  
  
  // const saveImgFile = () => {
    //   const file = imgRef.current.files[0];
    //   console.log(file);
    //   setImgFile(file);
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   console.log(reader);
    //   reader.onloadend = () => {
      //     setShowImgFile(reader.result);
      //   };
      // };
      // try {
        //   setLoading(true);
        //   const formData = new FormData();
        //   formData.append("mainTitle", name);
        //   formData.append("point", point);
        //   formData.append("password", );
        
        //   if (imgFile) {
          //     formData.append("file", imgFile);
          //   }
          
  //   const response = await authorizedRequest({
  //     method: "post",
  //     url: "/api1/api/members/update",
  //     data: formData,
  //     headers: header,
  //   });
  
  
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setSelectedImage(file);
    setImageUrl(URL.createObjectURL(file));
  };
  
  const handleStarClick = (starIndex) => {
    setSelectedStars(starIndex + 1);
  };
  
  const handlePreview = () => {
    if (selectedImage) {
      console.log('선택한 이미지:', selectedImage.name);
      setName(document.getElementById('name').value);
      setCardDescription(document.getElementById('card_Description').value); // 수정
      console.log('선택된 별의 갯수:', selectedStars);
      
      setPoint(selectedStars);
      setShowCard(true);
    } else {
      console.log('이미지를 선택해주세요.');
    }
  };
  // const [fetchImg, setFetchImg] = useState(['']);
  // const [title, setTitle] = useState([''])

  
  const handleCardUpload = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("mainTitle", name);
      formData.append("point", point);
      formData.append("cardDescription", card_Description);
      formData.append("MainImg", selectedImage);
      formData.append("userId", userId);
      // formData.append("cardId", 552355);

      
      
      console.log(formData)
      axios.post('https://i9e202.p.ssafy.io/api/card', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
          console.log('성공적인 요청을 보냈습니다.:', response.data);
          
        })
        .catch((error) => {
          console.error('POST 과정 중 실패하였습니다.:', error);
        });
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
        {/* <div>{fetchImg.map((img, index) => (
          <img 
          key={index}
          src={img}
          alt= {`Fetch img ${index}`}
          />))}</div> */}

          {/* <div>
            {title.map((tit, index) => (
              tit.
            ))}
          </div> */}
      </div>
      <div className='image-container'>
        <div className='image-box' onClick={handleImageClick}>
          {imageUrl ? (
            <img
            src={imageUrl}
            alt='선택한 이미지'
            style={{ MaxWidth: '200px', maxHeight: '180px', width:'200px', height:'200px', marginLeft: '3px', marginTop: '3px' }}
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
      <div className='gridbox'>
      <button className='button' onClick={handleCardUpload}>등록하기</button>
      <button onClick={showCard ? handleReset : handlePreview} className='button'>
        {showCard ? '다시 만들기' : '미리보기'}
      </button>
      {/* <button onClick={fetchSomeData}>GET 요청 보내기</button> */}
      </div>

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