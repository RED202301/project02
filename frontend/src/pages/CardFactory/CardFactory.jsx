import './CardFactory.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from'react-router-dom';
// import CardD from './CardD';
// import cardE from '../../Card/Card'
import Card from './Card/Card'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown} from "@fortawesome/free-solid-svg-icons";
function CardFactory( ){
  const [deckkk, setDeckkk] = useState('덱 목록');
  const [recard, setRecard] = useState('');
  const [dataFetched, setDataFetched] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [selectedCardIds, setSelectedCardIds] = useState([]); // 선택한 카드들의 ID를 보관하는 배열
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false)
    const [isModalOpens, setIsModalOpens] = useState(false);
    const openModals = () => setIsModalOpens(true);
    const closeModals = () => setIsModalOpens(false)
    const [res, setRes] = useState([''])
    const [rescard, setRescard] = useState('');
    // const [userId, setUserId] = useState('');
    const [deckinfo, setDeckInfo] = useState([]);
    const [cardinfo, setCardInfo] = useState([]);
    const [selectedCardId, setSelectedCardId] = useState(null); // 선택한 카드의 ID 상태
    const [responseData, setResponseData] = useState([]); // GET 요청으로 받아온 데이터를 저장하는 배열
    const [userId, setUserId] = useState('');

    const [info, setInfo] = useState('');

    const [showCard, setShowCard] = useState(false);
    function getUserIdFromLocalStorage() {
      return localStorage.getItem('userId');
    }
 
    useEffect(() => {
      const storedUserId = getUserIdFromLocalStorage();
      if (storedUserId) {
        setUserId(storedUserId);
        console.log(setUserId)
      }
    }, []);
    // console.log(userId)
    // const userId = 6;
    const handleDeckCard = (cardId) => {
      setSelectedCardId(cardId);
      // console.log('선택한 카드의 아이디:', cardId);
      setRecard(cardId);
    };
  // console.log(rescard)

  const handlerescard = () => {
    if (recard) {
      setRescard(recard);
      // console.log('대표카드가 선택되었습니다.', recard);
      Swal.fire ({
        icon: 'confirm',
        title: '대표 카드 지정'
      })
    } else {
      // console.log('대표 카드를 선택해주세요.');
    }
  };
  function sendRequestForSelectedCardIds() {
    // 사용자 ID
    const selectedCardIdPromises = selectedCardIds.map(cardId => {
      return axios.get(`https://i9e202.p.ssafy.io/api/card/cardId/${cardId}`);
    });
    
    Promise.all(selectedCardIdPromises)
    .then(responses => {
      const extractedData = responses.map(response => response.data);
      // console.log('데이터 내용입니다', extractedData);
      setResponseData(extractedData)
      // 여기에서 추출한 데이터를 원하는 방식으로 활용할 수 있습니다.
    })
    .catch(error => {
      console.error('Multiple GET 요청 실패:', error);
    });
  }

  
  // console.log(responseData)


  async function fetchDeckNameData() {
    try {
      const responseDeck = await axios.get(`https://i9e202.p.ssafy.io/api/deck/deckTitle`);
      // console.log('deck정보:', responseDeck.data);
      
      // responseDeck.data를 그대로 사용하여 deckinfo를 업데이트합니다.
      setDeckInfo(responseDeck.data);
      // setShowCard(true);
    } catch (error) {
      console.error('덱 패치 실패', error);
    }
  }
  
  useEffect(() => {
    fetchDeckNameData();
  }, []);
  
  // console.log(deckinfo);
  // console.log(cardinfo);
  // console.log(deckinfo)
  async function fetchSomeData() {
    try {
      const response = await axios.get(`https://i9e202.p.ssafy.io/api/card/${userId}`);
      
      // console.log('GET 요청 성공:', response.data);
      setRes(response.data);
      // console.log(res);
      setDataFetched(true);
      // setFetchImg(response.data.mainImgUrl);
      // setTitle(response.data.mainTitle);
    } catch (error) {
      console.error('GET 요청 실패:', error);
    }
  }
    // console.log(selectedCardIds)
    // console.log(res.data)
    return (
        <div className="CardFactory">
              <div className="game">
            <Link to='/Main'>
            <div id='r3' className="cards-social-icon" style={{display:'flex', justifyContent:'flex-start', width:'50px'}}>
                    <img src="src/assets/로그아웃.svg"style={{'width':'3em', marginTop:'30px', marginLeft:'30px'}} alt="z" />
                    <p style={{marginTop:'55%'}}>GO MAIN</p>
            </div>
            </Link>
            </div>
      {/* <CardD /> */}
      <div className="grid">
      {/* <cardE></cardE> */}
      <div>
      
      <Deckin setShowCard={setShowCard} userId={userId} handlerescard={handlerescard} handleDeckCard={handleDeckCard} recard={recard} setRecard={setRecard} selectedCardIds={selectedCardIds} responseData={responseData} rescard={rescard} setRescard={setRescard} setSelectedCardIds={setSelectedCardIds} selectedCardId={selectedCardId} setSelectedCardId={setSelectedCardId} sendRequestForSelectedCardIds={sendRequestForSelectedCardIds}></Deckin>
      <button className="btnd btnd-5" onClick={openModals} style={{marginLeft:'5%', fontFamily:'YeongdeokBlueroad'}} >덱 등록하기</button>
      <ModalX setShowCard={setShowCard}  userId={userId} selectedCardId={selectedCardId} setSelectedCardId={setSelectedCardId} handleDeckCard={handleDeckCard} sendRequestForSelectedCardIds={sendRequestForSelectedCardIds}  setSelectedCardIds={setSelectedCardIds} isOpens={isModalOpens} closeModals={closeModals} className='modalbox' selectedCardIds={selectedCardIds} rescard={rescard}>
      <Deckintroduce setShowCard={setShowCard}  userId={userId} selectedCardId={selectedCardId} setSelectedCardId={setSelectedCardId} handleDeckCard={handleDeckCard} selectedCardIds={selectedCardIds} setSelectedCardIds={setSelectedCardIds} responseData={responseData} sendRequestForSelectedCardIds={sendRequestForSelectedCardIds} />
      </ModalX>
      {/* <button id="silverborders">대표 카드지정</button> */}
      {/* <button onClick={sendRequestForSelectedCardIds}>덱 불러오기</button> */}

      </div>
      <div >
      <div>

    </div>
    <div>

          <div className='magin'>
            <div className='gridTitle'>
          <Selectin
            setShowCard={setShowCard}
            DropdownMenu={DropdownMenu}
            setCardInfo={setCardInfo}
            showCard={showCard}
            deckkk={deckkk}
            setDeckkk={setDeckkk}
            userId={userId}
            res={res}
            fetchSomeData={fetchSomeData}
            selectedCardIds={selectedCardIds}
            setSelectedCardIds={setSelectedCardIds}
            selectedCardIndex={selectedCardIndex}
            setSelectedCardIndex={setSelectedCardIndex}
            onAddToDeck={(selectedCard) => {
              sendRequestForSelectedCardIds(selectedCard);
              
            }}
            deckinfo={deckinfo}
            cardinfo={cardinfo}
            // userId={userId}
            />            
             </div>
          </div>
      {/* </div> */}
      </div>      
     <div>
     <button onClick={openModal} className='btnd btnd-5' style={{position:'relative', fontFamily:'YeongdeokBlueroad'}}>카드 만들기</button>
     </div>
      
      {/* <button onClick={handleAddToDeck}>덱에 담기</button> */}
      {/* <button onClick={fetchSomeData}>카드 불러오기</button> */}

      {/* <button onClick={handleDeckInClick}>덱에담기</button> */}
      <Modal userId={userId} isOpen={isModalOpen} closeModal={closeModal} fetchSomeData={fetchSomeData} className='modalbox'>
        <Deckmake userId={userId} fetchSomeData={fetchSomeData} closeModal={closeModal}></Deckmake>
      </Modal>

      </div>

      </div>
        </div>
    )
}

function DropdownMenu({showCard, userId, setShowCard, deckkk, setDeckkk,fetchSomeData, deckinfo, cardinfo, setCardInfo, selectedCardIds, setSelectedCardIds, onAddToDeck }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDeckName, setSelectedDeckName] = useState(null);

  
  const dropdownRef = useRef(null); // Ref for the dropdown container
  
  useEffect(() => {
    // Attach click event listener to document when the component mounts
    document.addEventListener('click', handleClickOutside);
    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  const handleClickOutside = (event) => {
    // Close the dropdown when a click is detected outside of the dropdown container
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handlefetch = () => {
    setShowCard(true)
    fetchSomeData();
    setDeckkk('내 카드')
  }
  
  const handleclick = async (deckName) => {
    try {
      const responseDeckCards = await axios.get(`https://i9e202.p.ssafy.io/api/deck/deckCards?deckName=${deckName}`);
      console.log('덱 카드 정보:', responseDeckCards.data.cardList);

      setCardInfo(responseDeckCards.data.cardList);
      setSelectedDeckName(deckName);
      await fetchSomeData();
      setDeckkk(deckName);
      setIsOpen(false);
      setShowCard(false); // Close the dropdown after selecting an item
    } catch (error) {
      console.error('덱 카드 정보 요청 실패', error);
    }
  };
    
  useEffect(() => {
    // Attach click event listener to document when the component mounts
    handleclick();
  }, []);

  return (
    <div className="dropdown-container" style={{ zIndex: '2' }} ref={dropdownRef}>
    <div style={{ borderRadius: '6px', color:'#515F65', fontWeight:'bold', display:'flex', justifyContent:'space-between'}} className="dropdown-button " onClick={toggleDropdown}>
    {deckkk}
      <div style={{marginLeft:'10px', marginTop:'2px'}}>
      <FontAwesomeIcon
        icon={isOpen ?  faChevronUp: faChevronDown}
        style={{ marginRight: '5px', transition: 'transform 0.2s ease-in-out'}}
      />
      </div>
    </div>
    {isOpen && (
      <ul className="dropdown-list" style={{marginLeft:'5px', color:'#515F65', fontWeight:'bold' }}>
        <div className='dropx'>
          {deckinfo.map((data) => (
            <li key={data}>
              
              <p onClick={() => handleclick(data)} className="dropdown-item" >
                <span style={{color:'#515F65'}}>🃢</span> <span style={{marginLeft:'5px', color:'#515F65'}}>{data}</span>
              </p>
        
            </li>
          ))}
          <li>
            <p onClick={handlefetch} className='dropdown-item'>내 카드</p>
          </li>
        </div>
      </ul>
    )}
  </div>
  );
}









function Deckin({ userId, selectedCardId, setSelectedCardId, handleDeckCard, handlerescard, selectedCardIds, responseData, rescard, setRescard, sendRequestForSelectedCardIds, setSelectedCardIds }) {
  return (
    <div>
      <div className='gridTitle'>
      
      </div>
      {selectedCardIds !== null && selectedCardIds.length > 0 ? (
        <div className="factory board">
          <div className='grids'>
          <h4 className='bold' style={{display:'flex', justifyContent:'flex-start', marginLeft:'30%', color:'#515F65', fontSize:'30px'}}>덱에 포함시킬 카드</h4>
          <button className='bttn' onClick={handlerescard} style={{width:'130px', height:'40px', marginTop: '15%',color:'white', fontWeight:'bold', marginLeft:'-45%', backgroundColor:'#515F65'}}>대표 카드</button>
          </div>
          <Carddeck userId={userId} selectedCardId={selectedCardId} setSelectedCardId={setSelectedCardId} handleDeckCard={handleDeckCard} setSelectedCardIds={setSelectedCardIds} sendRequestForSelectedCardIds={sendRequestForSelectedCardIds} rescard={rescard} setRescard={setRescard} key={responseData.cardId} cardId={responseData.cardId} responseData={responseData} selectedCardIds={selectedCardIds}/>
        </div>
      ) : (

        <div className="factory">
          <div className='grids'>
          <h4 className='bold' style={{display:'flex', justifyContent:'flex-start', marginLeft:'30%', color:'#515F65', fontSize:'30px'}}>덱에 포함시킬 카드</h4>
          <button onClick={handlerescard} style={{width:'130px', height:'40px', marginTop: '15%', marginLeft:'-45%',color:'white', fontWeight:'bold', backgroundColor:'#515F65'}}>대표 카드</button>
          </div>
        <p className='board'></p></div>
      )}
    </div>
  );
}




function Selectin({  showCard, setShowCard, deckkk, setDeckkk, setCardInfo, deckinfo, cardinfo, userId, res, sendRequestForSelectedCardIds, onAddToDeck, fetchSomeData, selectedCardIds, setSelectedCardIds}) {
  return (
    <div>
      <div>
        <div className='gridTitles scrollable-container'>
      <div className="factory board contents">
      <div className='grids'>
      <h4 className='bold' style={{display:'flex', justifyContent:'flex-start', marginLeft:'30%', color:'#515F65', fontSize:'30px'}}>선택할 카드</h4>
          <div style={{ marginLeft:'-150%', marginTop: '8%'}}>
          <DropdownMenu
          setShowCard={setShowCard}
          showCard={showCard}
          deckkk={deckkk}
          setDeckkk={setDeckkk}
          fetchSomeData={fetchSomeData}
           selectedCardIds={selectedCardIds}
          setSelectedCardIds={setSelectedCardIds}  
          onAddToDeck={(selectedCard) => {
            sendRequestForSelectedCardIds(selectedCard);
            
          }} 
          CardD={CardG} 
          cardinfo={cardinfo} 
          setCardInfo={setCardInfo} 
          deckinfo={deckinfo}
          />
          </div>
          </div>
        {!showCard ? (<CardG cardinfo={cardinfo}
        userId={userId}
        selectedCardIds={selectedCardIds}
        setSelectedCardIds={setSelectedCardIds}
        onAddToDeck={onAddToDeck}
         sendRequestForSelectedCardIds={sendRequestForSelectedCardIds}
         />) : <CardD
         showCard={showCard}
         setShowCard={setShowCard}
         userId={userId}
         res={res}
         fetchSomeData={fetchSomeData}
         selectedCardIds={selectedCardIds}
         setSelectedCardIds={setSelectedCardIds}

         onAddToDeck={(selectedCard) => {
           sendRequestForSelectedCardIds(selectedCard);
           
         }}

         cardinfo={cardinfo}/> }
         
         </div>
      </div>
      </div>
    </div>
  )
}
  function Modal({userId, isOpen, closeModal, fetchSomeData}) {

    return (
      <div style={{display:isOpen ? "block": "none", zIndex:'1'}} className='modalbox'>
        <button onClick={closeModal} className='buttonY'>X</button>
        <Deckmake userId={userId} closeModal={closeModal} fetchSomeData={fetchSomeData}/>
        <div className='buttoncontain'>
        

        </div>
      </div>
    )
  }

  function ModalX({userId, isOpens, closeModals, selectedCardIds, responseData, recard, rescard}) {
    return (
      <div style={{display:isOpens ? "block": "none", zIndex:2,}} className='modalboxs'>
        <button onClick={closeModals} className='buttonX'>X</button>
        <Deckintroduce userId={userId} selectedCardIds={selectedCardIds} responseData={responseData} recard={recard} rescard={rescard} closeModals={closeModals} />
        <div className='buttoncontain'>
        
        {/* <button onClick={closeModals} className='button'>등록하기</button> */}
        </div>
      </div>
    )
  }

function Deckmake({ userId, closeModal, fetchSomeData}) {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [selectedStars, setSelectedStars] = useState(0);
  const [point, setPoint] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [enroll, setEnroll] = useState(false);
  const [inputValue, setInputValue] = useState('');

  
  const handleImageClick = () => {
    fileInputRef.current.click();
    
  };
  
  
  
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setSelectedImage(file);
    setImageUrl(URL.createObjectURL(file));
    event.target.value = null;
  };
  // console.log(selectedImage)
  // console.log(imageUrl)

  const handleStarClick = (starIndex) => {
    setSelectedStars(starIndex + 1);
  };
  // console.log(selectedImage)
  // console.log(imageUrl)

  const handlePreview = () => {
    if (selectedImage) {
      // console.log('선택한 이미지:', selectedImage.name);
      setName(document.getElementById('name').value);
      setSubTitle(document.getElementById('sub_Title').value); // 수정
      // console.log('선택된 별의 갯수:', selectedStars);
      
      setPoint(selectedStars);
      setShowCard(true);
      setEnroll(true);
      
    } else {
      
      console.log('이미지를 선택해주세요.');
      Swal.fire ({
        icon:'warning',
        title:'이미지 입력',
        text: '이미지를 입력해주세요'
      })
    }
    // console.log(selectedImage)
    // console.log(imageUrl)
  };

  // const [fetchImg, setFetchImg] = useState(['']);
  // const [title, setTitle] = useState([''])
  const handleCardUpload = async () => {
    setName(document.getElementById('name').value);
    setSubTitle(document.getElementById('sub_Title').value);
    setPoint(selectedStars);
    if (selectedImage || name || subTitle || point) {
      // setShowCard(true);
      setEnroll(true);
      const formData = new FormData();
    formData.append('mainTitle', name);
    formData.append('point', point);
    formData.append('subTitle', subTitle);
    formData.append('MainImg', selectedImage);
    formData.append('userId', userId);
  
    try {
      const response = await axios.post('https://i9e202.p.ssafy.io/api/card', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      await fetchSomeData(); // fetchSomeData 함수 호출
      // console.log('성공적인 요청을 보냈습니다.:', response.data);
      setEnroll(false);
      setImageUrl(null);
      closeModal();
      handleReset();
    } catch (error) {
      console.error('POST 과정 중 실패하였습니다.:', error);
    }
  }else{
      Swal.fire({
    icon: 'warning',
    title: '누락된 정보',
    text: '필요한 정보를 모두 입력해주세요.',
  });
  return;
    }};

  
  
    
  
  
  
  
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    if (newValue.length <= 15) {
      setInputValue(newValue);
    } else {
      // 글자수 제한 초과 시 경고 메시지 출력
      Swal.fire({
        icon: 'warning',
        title: '글자 수 초과',
        text: '15자 이하로 작성해주십시오.'
      });
    }
  };
  // useEffect(() => {
  //   // selectedCardIds가 변경되면 데이터 요청 실행
  //   setSelectedImage(null);
  // }, [handleImageUpload]);
  const handleReset = () => {
    setShowCard(false);
    setSelectedImage(null);
    setName('');
    setSubTitle('');
    setImageUrl(null);
    setInputValue('');
    setSelectedStars(0);
    setPoint(0);
  };
const showTrue = () => {
  setShowCard(false);

}

  return (
    
    <div className='makebox' style={{marginLeft:'9px'}}>
      <h3>카드 만들기</h3>
      <input 
      id='name' 
      className='showingbox' 
      placeholder='이름' 
      maxLength={15}
      onInput={handleInputChange}
      value={name}
      onChange={(e) => setName(e.target.value)}
      />
      <input 
      id='sub_Title' 
      className='showingbox' 
      placeholder='부제목' 
      onInput={handleInputChange} 
      value={subTitle} 
      onChange={(e) => setSubTitle(e.target.value)}
      />

      <div className='star-container' style={{marginLeft:'0%'}}>
        {[...Array(3)].map((_, index) => (
          <div
          key={index}
          className={`star ${selectedStars > index ? 'yellow' : ''}`}
          onClick={() => handleStarClick(index)}
          style={{marginLeft:'1px'}}
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
            style={{ MaxWidth: '280px', maxHeight: '300px', width:'280px', height:'200px', marginLeft: '3px', marginTop: '20px' }}
            />
            ) : (
              <p className='imagebox'
              style={{ MaxWidth: '280px', maxHeight: '300px', width:'280px', height:'200px', marginLeft: '3px', marginTop: '20px' }}>카드 사진</p>
              )}
        </div>
      </div>

      <input
        type='file'
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      {/* <div className='gridboxx'> */}
      <button className='buttonsss' onClick={handleCardUpload}>등록하기</button>
      {/* <button onClick={showCard ? showTrue: handlePreview} className='button'>
        {showCard ? '다시 만들기' : '미리보기'}
      </button>
      <button onClick={fetchSomeData}>GET 요청 보내기</button> */}
      {/* </div> */}

      <div className='margincard'>
        {showCard && name && imageUrl && subTitle && (
          <div>
            <Card userId={userId} mainTitle={name} fetchSomeData={fetchSomeData} mainImgUrl={imageUrl} subTitle={subTitle} point={point} />
          </div>
        )}

      
      </div>
    </div>
  );
}
function CardG({cardinfo,userId,  fetchSomeData, onAddToDeck, selectedCardIds, setSelectedCardIds}) {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isAddToDeckButtonVisible, setIsAddToDeckButtonVisible] = useState(true);

  const handleCardClick = (cardId) => {
    setSelectedCardId(cardId);
  };
  // console.log(selectedCardId)
  
  const handleAddToDeck = () => {
    if (selectedCardId !== null) {
      if (selectedCardIds.length < 25) {
        if (!selectedCardIds.includes(selectedCardId)) {
          setSelectedCardIds((prevSelectedCardIds) => [...prevSelectedCardIds, selectedCardId]);
          const selectedCard = cardinfo.find((card) => card.cardId === selectedCardId);
          onAddToDeck(selectedCard);
        } else {
          // console.log('이미 선택된 카드입니다.');
          Swal.fire({
            icon: 'warning',
            text: '이미 선택된 카드입니다.'
          });
        }
      } else {
        // console.log('덱에는 최대 25개까지만 추가할 수 있습니다.');
        Swal.fire({
          icon: 'warning',
          title: '덱 카드 부족',
          text: '덱에는 최대 25개까지만 추가할 수 있습니다.'

      })

      }
    } else {
      console.log('카드를 선택해주세요.');
    }
    
  };
 
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {cardinfo.map((data) => (
          <div
            className={`cardd ${selectedCardId === data.cardId ? 'selected-card' : ''} ${
              selectedCardIds.includes(data.cardId) ? 'added-to-deck' : ''
            }`}
            id={`${selectedCardId === data.cardId ? 'selected-card' : ''}`}
            key={data.cardId}
            style={{ marginTop: '2%', marginLeft: '2%', width: '30%', maxWidth: '140px' }}
            onClick={() => handleCardClick(data.cardId)}
          >
            <div className='content'>
                <div className='subtitle'>{truncateText(data.subTitle, 5)}</div>
              <div className='cardtitled'>{truncateText(data.mainTitle, 5)}</div>
              <div>
                <div className='star-container'>
                  {[...Array(data.point)].map((_, index) => (
                    <span key={index} className='yellow-stard'>
                      ⭐
                    </span>
                  ))}
          
                </div>
              </div>
                <div style={{ display: 'flex', marginLeft:'-6%', marginTop:'35%', position:'absolute',  fontSize:'12px', justifyContent:'center', alignItems:'center' }}>
                  {selectedCardId === data.cardId && (
                    <button onClick={handleAddToDeck} className='deckbuttosn added-to-deck' >
  
                      담기
                    </button>
                  )}
  
                </div>
              <img
                src={data.mainImgUrl}
                alt=''
                style={{
                  display: 'flex',
                  marginTop: '0.5vh',
                  width: '8vw',
                  height: '14vh',
                  // borderRadius: '10px',
                  marginLeft: '2.5%',
                  // zIndex:'1',
                  
                }}
              ></img>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}




function CardD({ userId, fetchSomeData, onAddToDeck, res, selectedCardIds, setSelectedCardIds}) {
  const [selectedCardId, setSelectedCardId] = useState(null);
  // const [isAddToDeckButtonVisible, setIsAddToDeckButtonVisible] = useState(true);

  const handleCardClick = (cardId) => {
    setSelectedCardId(cardId);
  };
  // console.log(selectedCardId)
  const handleDeleteCard = async () => {
    try {
      if (selectedCardId) {
        if (selectedCardIds.includes(selectedCardId)) {
          Swal.fire({
            icon: 'warning',
            title: '경고',
            text: '덱에 포함된 카드는 삭제할 수 없습니다.'
          });
        } else {
          const response = await axios.delete(`https://i9e202.p.ssafy.io/api/card/${selectedCardId}`);
          // console.log('카드 삭제 완료:', selectedCardId);

          setSelectedCardIds((prevSelectedCardIds) =>
            prevSelectedCardIds.filter((id) => id !== selectedCardId)
          );

          await fetchSomeData();
        }
      } else {
        console.log('선택된 카드가 없습니다.');
      }
    } catch (error) {
      console.error('카드 삭제 실패:', error);
    }
  };

  const handleAddToDeck = () => {
    if (selectedCardId !== null) {
      if (selectedCardIds.length < 25) {
        if (!selectedCardIds.includes(selectedCardId)) {
          setSelectedCardIds((prevSelectedCardIds) => [...prevSelectedCardIds, selectedCardId]);
          const selectedCard = res.find((card) => card.cardId === selectedCardId);
          onAddToDeck(selectedCard);
        } else {
          // console.log('이미 선택된 카드입니다.');
          Swal.fire({
            icon: 'warning',
            text: '이미 선택된 카드입니다.'
          });
        }
      } else {
        // console.log('덱에는 최대 25개까지만 추가할 수 있습니다.');
        Swal.fire({
          icon: 'warning',
          title: '덱 카드 초과',
          text: '덱에는 최대 25개까지만 추가할 수 있습니다.'
      })

      }
    } else {
      console.log('카드를 선택해주세요.');
    }
    
  };
  const [dis, setDis] = useState(false);
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
      {res.map((data) => (
        <div
          className={`cardd ${selectedCardId === data.cardId ? 'selected-card' : ''} ${
            selectedCardIds.includes(data.cardId) ? 'added-to-deck' : ''
          }`}
          id={`${selectedCardId === data.cardId ? 'selected-card' : ''}`}
          key={data.cardId}
          style={{ marginTop: '2%', marginLeft: '2%', width: '30%', maxWidth: '140px' }}
          onClick={() => handleCardClick(data.cardId)}
          >
          <div className='content'>
          <div className='gridXXX'>
          <div className='cardtitled'>{truncateText(data.mainTitle, 5)}</div>
          {selectedCardId === data.cardId && (
              <button
              style={{ display: 'flex', marginLeft:'25.5%', marginTop:'0%', position:'absolute',  fontSize:'10px', justifyContent:'center', alignItems:'center' }}
            className='deckbuttossn added-to-deck'
            onClick={() => handleDeleteCard(data.cardId)}
            >
            ❌
            </button>
            )}
            </div>
              <div className='subtitle'>{truncateText(data.subTitle, 5)}</div>
            <div>
              <div className='star-container'>
                {[...Array(data.point)].map((_, index) => (
                  <span key={index} className='yellow-stard'>
                    ⭐
                  </span>
                ))}
        
              </div>
            </div>
              <div style={{ display: 'flex', marginLeft:'-6%', marginTop:'35%', position:'absolute',  fontSize:'12px', justifyContent:'center', alignItems:'center' }}>
                {selectedCardId === data.cardId && (
                  <button onClick={handleAddToDeck} className='deckbuttosn added-to-deck' >

                    담기
                  </button>
                )}

              </div>
            <img
              src={data.mainImgUrl}
              alt=''
              style={{
                display: 'flex',
                marginTop: '0.5vh',
                width: '8vw',
                height: '14vh',
                // borderRadius: '10px',
                marginLeft: '2.5%',
                // zIndex:'1',
                
              }}
            ></img>

          </div>
        </div>
      ))}
    </div>
  </div>
);
}


function Carddeck({ userId, responseData, handleDeckCard, selectedCardIds, selectedCardId, setSelectedCardId, recard, setRecard, fetchSomeData, rescard, setRescard, setSelectedCardIds, sendRequestForSelectedCardIds}) {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  const handleMinusCard = async (cardId) => {
    try {
      // 선택한 카드 ID를 selectedCardIds 배열에서 제거
      setSelectedCardIds(prevSelectedCardIds =>
        prevSelectedCardIds.filter(id => id !== cardId)
      );
      setSelectedCardId(cardId);
      // 데이터 요청 실행 (선택한 카드 제거 후)
      await sendRequestForSelectedCardIds();

  
      // console.log(`카드 ${cardId}를 덱에서 제거했습니다.`);
      
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };
  // console.log(selectedCardId)
  // console.log(recard)
  // const handlerescard = () => {
  //   if (recard) {
  //     setRescard(recard);
  //     console.log(recard);
  //   } else {
  //     console.log('대표 카드를 선택해주세요.');
  //   }
  // };
  useEffect(() => {
    // selectedCardIds가 변경되면 데이터 요청 실행
    sendRequestForSelectedCardIds();
  }, [selectedCardIds]);
  const rows = [];
  for (let i = 0; i < responseData.length; i += 7) {
    const row = responseData.slice(i, i + 7);
    rows.push(row);
  }
  return (
    <div>
      {rows.map((row, rowIndex) => (
        <ul
        key={rowIndex}
        style={{
          display: 'flex',
          marginLeft: '-7%',
          marginTop: rowIndex > 0 ? '20px' : '0',
          
        }}
        >
          {row.map((data, cardIndex) => (
            
            <div
            className={`carddeck`}
            id={`${selectedCardId === data.cardId ? 'selected-card' : ''}`}
            onClick={() => handleDeckCard(data.cardId)}
            key={cardIndex}
            style={{ marginTop: '2%', marginLeft: '2%' }}
            >
              <div className='contentss'>

                  <div className='titlefont gridboxx'>
                  {truncateText(data.mainTitle, 3)}
                  </div>
                <div className={`carddecktitled`}>

 
                  <div className='subfont'>{truncateText(data.subTitle, 3)}</div>
                    </div>
                  <div>
                <div className='gridcard' style={{zIndex:'1', marginLeft:'-5%'}}>
                <div className='star-containers'>
                  {[...Array(data.point)].map((_, index) => (
                    <span key={index} className='yellow-stardd'>
                      ⭐
                    </span>
                  ))}
                  </div>
                </div>
                </div>
                <div style={{display:'flex'}}>
                <img
                  src={data.mainImgUrl}
                  alt=''
                  style={{
                    display: 'flex',
                    // marginTop: '0.5vh',
                    width: '4vw',
                    height: '8vh',
                    // borderRadius: '10px',
                    marginLeft: '5%',
                    marginTop: '2%',
                  }}
                  />
                {selectedCardId === data.cardId && (
                  <button
                className='btns-hover color-6 deckbutton added-to-deck'
                onClick={() => handleMinusCard(data.cardId)}
                >
                빼기 
                </button>
                )}
                </div>
              </div>
            </div>
          ))}
        </ul>

      ))}
    </div>
  );
}


  function Deckintroduce({ userId, selectedCardIds, responseData, rescard, closeModals }) {
    const [deckTitle, setDeckTitle] = useState('');
    const [deckDescription, setDeckDescription] = useState('');
    // const [repCard, setRepCard] = useState(null); // 대표 카드 정보 상태
    const [repCardIdToSend, setRepCardIdToSend] = useState(''); // 대표 카드 ID 상태

    // console.log(rescard)
    // console.log(selectedCardIds)





    const handleDeckUpload = () => {
      if (selectedCardIds.length === 25) {
        const deckData = {
          deck: {
          userId: userId,
          cardId: rescard,
          deckName: deckTitle,
          deckDescription: deckDescription,
          },
          cardIdList: selectedCardIds
        };
    
        axios.post('https://i9e202.p.ssafy.io/api/deck', deckData)
          .then(response => {
            console.log('성공적으로 요청을 보냈습니다.', response.data);
            closeModals();
          })
          .catch(error => {
            console.error('POST request failed:', error);
            Swal.fire ({
              icon: 'warning',
              title: '대표카드!!',
              text: '대표카드를 지정해주세요'
            })
          });
      } else {
        // console.log('카드가 부족합니다.');
        Swal.fire({
          icon: 'warning',
          title: '덱 카드 부족',
          text: '25장을 채워주십시오.'
      })
      }
    };
    

    
 
    return (
    <div>
      <div className='makebox' style={{zIndex:'3'}} >
        <h3>덱 등록하기</h3>
        <p style={{    display: 'flex',
    alignItems: 'center',
    /* margin-bottom: 5px, */
    color: 'black',
    fontWeight: '600',
    fontSize: '1rem',}}>덱 이름</p>
        <input
          className='showingbox'
          placeholder='이름'
          value={deckTitle}
          onChange={event => setDeckTitle(event.target.value)}
        />
        <p style={{    display: 'flex',
    alignItems: 'center',
    /* margin-bottom: 5px, */
    color: 'black',
    fontWeight: '600',
    fontSize: '1rem',}}>덱 설명</p>
        <input
          className='introducebox'
          placeholder='덱 소개글'
          value={deckDescription}
          onChange={event => setDeckDescription(event.target.value)}
        />
  
     
      </div>
        <button className='butt' onClick={handleDeckUpload} >등록하기</button>
      </div>
    );
  }
  



export default CardFactory;