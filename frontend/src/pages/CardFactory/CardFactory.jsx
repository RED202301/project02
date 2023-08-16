import './CardFactory.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
// import CardD from './CardD';
// import cardE from '../../Card/Card'
function CardFactory( ){
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

    const [selectedCardId, setSelectedCardId] = useState(null); // 선택한 카드의 ID 상태
    const [responseData, setResponseData] = useState([]); // GET 요청으로 받아온 데이터를 저장하는 배열
    const [userId, setUserId] = useState('');

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
    console.log(userId)
    // const handleAddToDeck = () => {
    //   if (selectedCardIndex !== null) {
    //     if (selectedCardIds.length < 25) {
    //       console.log('덱에 카드 추가:', res[selectedCardIndex].cardId);
    
    //       if (!selectedCardIds.includes(res[selectedCardIndex].cardId)) {
    //         setSelectedCardIds(prevSelectedCardIds => [...prevSelectedCardIds, res[selectedCardIndex].cardId]);
    //       } else {
    //         console.log('이미 선택된 카드입니다.');
    //       }
    //     } else {
    //       console.log('덱에는 최대 25개까지만 추가할 수 있습니다.');
    //     }
    //   } else {
    //     console.log('카드를 선택해주세요.');
    //   }
    // };
    // const handleDeckInClick = () => {
    //   // 덱에 담기 버튼을 눌렀을 때 실행될 함수
    //   if (selectedCardId !== null) {
    //     console.log('선택한 카드의 ID를 덱에 담기 작업으로 전달:', selectedCardId);

    //     // 이 부분에서 덱에 카드를 추가하는 작업 등을 수행할 수 있습니다.
    //   } else {
    //     console.log('카드를 선택해주세요.');
    //   }
    // };
    // const [selectedCardId, setSelectedCardId] = useState(null); // 선택한 카드의 ID 상태

    const handleDeckCard = (cardId) => {
      setSelectedCardId(cardId);
      console.log('선택한 카드의 아이디:', cardId);
      setRecard(cardId);
    };
  console.log(rescard)

  const handlerescard = () => {
    if (recard) {
      setRescard(recard);
      console.log('대표카드가 선택되었습니다.', recard);
    } else {
      console.log('대표 카드를 선택해주세요.');
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
      console.log('데이터 내용입니다', extractedData);
      setResponseData(extractedData)
      // 여기에서 추출한 데이터를 원하는 방식으로 활용할 수 있습니다.
    })
    .catch(error => {
      console.error('Multiple GET 요청 실패:', error);
    });
  }
  
  console.log(responseData)



    
  async function fetchSomeData() {
    try {
      const response = await axios.get(`https://i9e202.p.ssafy.io/api/card/${userId}`);
      
      console.log('GET 요청 성공:', response.data);
      setRes(response.data);
      console.log(res);
      setDataFetched(true);
      // setFetchImg(response.data.mainImgUrl);
      // setTitle(response.data.mainTitle);
    } catch (error) {
      console.error('GET 요청 실패:', error);
    }
  }
    console.log(selectedCardIds)
    // console.log(res.data)
    return (
        <div className="CardFactory">

      {/* <CardD /> */}
      <div className="grid">
      {/* <cardE></cardE> */}
      <div>
      
      <Deckin userId={userId} handlerescard={handlerescard} handleDeckCard={handleDeckCard} recard={recard} setRecard={setRecard} selectedCardIds={selectedCardIds} responseData={responseData} rescard={rescard} setRescard={setRescard} setSelectedCardIds={setSelectedCardIds} selectedCardId={selectedCardId} setSelectedCardId={setSelectedCardId} sendRequestForSelectedCardIds={sendRequestForSelectedCardIds}></Deckin>
      <button id="silverborder" onClick={openModals}  >덱 등록하기</button>
      <ModalX userId={userId} selectedCardId={selectedCardId} setSelectedCardId={setSelectedCardId} handleDeckCard={handleDeckCard} sendRequestForSelectedCardIds={sendRequestForSelectedCardIds}  setSelectedCardIds={setSelectedCardIds} isOpens={isModalOpens} closeModals={closeModals} className='modalbox' selectedCardIds={selectedCardIds} rescard={rescard}>
      <Deckintroduce userId={userId} selectedCardId={selectedCardId} setSelectedCardId={setSelectedCardId} handleDeckCard={handleDeckCard} selectedCardIds={selectedCardIds} setSelectedCardIds={setSelectedCardIds} responseData={responseData} sendRequestForSelectedCardIds={sendRequestForSelectedCardIds} />
      </ModalX>
      {/* <button id="silverborders">대표 카드지정</button> */}
      <button onClick={sendRequestForSelectedCardIds}>덱 불러오기</button>

      </div>
      {/* <div><CardL
      maTitle={maTitle}
      img={img}
      stpoint={stpoint}
      cscardDescription={cscardDescription}
    /></div> */}
      <div >
        {dataFetched ? (
      <Selectin
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
          />) : (<div><h4 className="bold">선택 가능한 카드</h4><div className='factory'></div></div>)}      
      <button onClick={openModal} className='btn btn-5'>카드 만들기</button>
      {/* <button onClick={handleAddToDeck}>덱에 담기</button> */}
      <button onClick={fetchSomeData}>카드 불러오기</button>
      {/* <button onClick={handleDeckInClick}>덱에담기</button> */}
      <Modal userId={userId} isOpen={isModalOpen} closeModal={closeModal} fetchSomeData={fetchSomeData} className='modalbox'>
        <Deckmake userId={userId} fetchSomeData={fetchSomeData} closeModal={closeModal}></Deckmake>
      </Modal>
      </div>
      </div>
        </div>
    )
}

function Carddeck({ userId, responseData, handleDeckCard, selectedCardIds, selectedCardId, setSelectedCardId, recard, setRecard, fetchSomeData, rescard, setRescard, setSelectedCardIds, sendRequestForSelectedCardIds}) {

  const handleMinusCard = async (cardId) => {
    try {
      // 선택한 카드 ID를 selectedCardIds 배열에서 제거
      setSelectedCardIds(prevSelectedCardIds =>
        prevSelectedCardIds.filter(id => id !== cardId)
      );
      setSelectedCardId(cardId);
      // 데이터 요청 실행 (선택한 카드 제거 후)
      await sendRequestForSelectedCardIds();

  
      console.log(`카드 ${cardId}를 덱에서 제거했습니다.`);
      
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };
  console.log(selectedCardId)
  console.log(recard)
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
              <div className='contents'>
                <div className={`carddecktitled`}>
                <div className='gridXX'>
                  {data.mainTitle}
 
                  {selectedCardId === data.cardId && (
                <button
                  style={{  width: '20px', fontSize: '10px'}}
                  className='xbox'
                  onClick={() => handleMinusCard(data.cardId)}
                  value={'❌'}
                  >
                  ❌ 
                  </button>
                  )}
                    </div>
                </div>
                <div className='gridcard' style={{zIndex:'1', marginLeft:'-5%'}}>
                <div className='subfont'>{data.subTitle}</div>
                <div className='star-containers'>
                  {[...Array(data.point)].map((_, index) => (
                    <span key={index} className='yellow-stardd'>
                      ★
                    </span>
                  ))}
                  </div>
                </div>
                <img
                  src={data.mainImgUrl}
                  alt=''
                  style={{
                    display: 'flex',
                    // marginTop: '0.5vh',
                    width: '4vw',
                    height: '6vh',
                    borderRadius: '10px',
                    marginLeft: '10%',
                  }}
                />
         
         {/* {selectedCardId === data.cardId && (
   
      <button
        style={{ width: '70px', fontSize: '10px', transform: 'scale(0.5)' }}
        className='repcardbox'
        onClick={handlerescard}
      >
        대표 카드
      </button>

  )} */}
              </div>
            </div>
          ))}
        </ul>

      ))}
    </div>
  );
}





function Deckin({ userId, selectedCardId, setSelectedCardId, handleDeckCard, handlerescard, selectedCardIds, responseData, rescard, setRescard, sendRequestForSelectedCardIds, setSelectedCardIds }) {
  return (
    <div>
      <div className='gridTitle'>
      <h4 className='bold'>덱에 포함시킬 카드</h4>
      <button onClick={handlerescard} style={{width:'130px', height:'40px', marginTop: '3%', marginLeft: '50%', color:'white', fontWeight:'bold'}}>대표 카드</button>
      </div>
      {selectedCardIds !== null && selectedCardIds.length > 0 ? (
        <div className="factory board">
          <Carddeck userId={userId} selectedCardId={selectedCardId} setSelectedCardId={setSelectedCardId} handleDeckCard={handleDeckCard} setSelectedCardIds={setSelectedCardIds} sendRequestForSelectedCardIds={sendRequestForSelectedCardIds} rescard={rescard} setRescard={setRescard} key={responseData.cardId} cardId={responseData.cardId} responseData={responseData} selectedCardIds={selectedCardIds}/>
        </div>
      ) : (
        <div className="factory"><p className='board'></p></div>
      )}
    </div>
  );
}





function Selectin({userId, res, sendRequestForSelectedCardIds, onAddToDeck, fetchSomeData, selectedCardIds, setSelectedCardIds}) {
    return (
      <div>
        <h4 className="bold">선택 가능한 카드</h4>
        <div className="factory board">
        <CardD
        userId={userId}
  fetchSomeData={fetchSomeData}
  res={res}
  selectedCardIds={selectedCardIds}
  setSelectedCardIds={setSelectedCardIds}
  onAddToDeck={onAddToDeck}
  sendRequestForSelectedCardIds={sendRequestForSelectedCardIds}
  />
        </div>
      </div>
    )
  }

  function Modal({userId, isOpen, closeModal, fetchSomeData}) {

    return (
      <div style={{display:isOpen ? "block": "none", zIndex:1}} className='modalbox'>
        <button onClick={closeModal} className='buttonX'>X</button>
        <Deckmake userId={userId} closeModal={closeModal} fetchSomeData={fetchSomeData}/>
        <div className='buttoncontain'>
        

        </div>
      </div>
    )
  }

  function ModalX({userId, isOpens, closeModals, selectedCardIds, responseData, recard, rescard}) {
    return (
      <div style={{display:isOpens ? "block": "none", zIndex:1}} className='modalbox'>
        <button onClick={closeModals} className='buttonX'>X</button>
        <Deckintroduce userId={userId} selectedCardIds={selectedCardIds} responseData={responseData} recard={recard} rescard={rescard} closeModals={closeModals} />
        <div className='buttoncontain'>
        
        {/* <button onClick={closeModals} className='button'>등록하기</button> */}
        </div>
      </div>
    )
  }

// 카드 만들기, 상세 모달

function CardX({userId, name, point, imageUrl, subTitle }) {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className='cardx'>
      <div className='middle-section'></div>
      <div className='content'>
        <div className='cardtitle'>{truncateText(name, 5)}</div>
        <div style={{display:'flex'}}>
        <div className='cardtitle'>{truncateText(subTitle, 5)}</div>
        <div className='star-container'>
          {[...Array(point)].map((_, index) => (
            <span key={index} className="yellow-star">★</span>
          ))}
        </div>
        </div>
        <div className='shortdiv'>
          <img src={imageUrl} alt='카드 이미지' style={{ display: 'flex', width: '180px', height: '200px', borderRadius: '10px' }} />
        </div>
      </div>
    </div>
  );
}



function CardD({userId, fetchSomeData, onAddToDeck, res, selectedCardIds, setSelectedCardIds }) {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isAddToDeckButtonVisible, setIsAddToDeckButtonVisible] = useState(true);

  const handleCardClick = (cardId) => {
    setSelectedCardId(cardId);
  };
  console.log(selectedCardId)
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
          console.log('카드 삭제 완료:', selectedCardId);

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
          console.log('이미 선택된 카드입니다.');
          Swal.fire({
            icon: 'warning',
            text: '이미 선택된 카드입니다.'
          });
        }
      } else {
        console.log('덱에는 최대 25개까지만 추가할 수 있습니다.');
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
            style={{ marginTop: '2%', marginLeft: '2%', width: '30%', maxWidth: '300px' }}
            onClick={() => handleCardClick(data.cardId)}
          >
            <div className='content'>
              <div className='gridXXX'>
              <div className='cardtitled'>{truncateText(data.mainTitle, 5)}</div>

              {selectedCardId === data.cardId && (
              <button
                  style={{width:'25px',height:'25px', fontSize: '10px'}}
                  className='Xbox'
                  onClick={() => handleDeleteCard(data.cardId)}
                  value={'❌'}
                  >
                  ❌ 
                  </button>
                   )}
      
                  </div>
              <div className='gridcard'>
                <div className='subtitle'>{truncateText(data.subTitle, 5)}</div>
                <div className='star-container'>
                  {[...Array(data.point)].map((_, index) => (
                    <span key={index} className='yellow-stard'>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <img
                src={data.mainImgUrl}
                alt=''
                style={{
                  display: 'flex',
                  marginTop: '2vh',
                  width: '10vw',
                  height: '20vh',
                  borderRadius: '10px',
                  marginLeft: '13%'
                }}
              ></img>
                  <div style={{ display: 'flex',fontSize:'10px', justifyContent:'center', alignItems:'center' }}>
                    {selectedCardId === data.cardId && (
                      <button onClick={handleAddToDeck} className='btn-hover color-6 deckbutton added-to-deck' >
    
                        담기
                      </button>
                    )}
    
                  </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



function Deckmake({userId, closeModal, fetchSomeData}) {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [selectedStars, setSelectedStars] = useState(0);
  const [point, setPoint] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [enroll, setEnroll] = useState(false);


  
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
  
  const handlePreview = () => {
    if (selectedImage) {
      console.log('선택한 이미지:', selectedImage.name);
      setName(document.getElementById('name').value);
      setSubTitle(document.getElementById('sub_Title').value); // 수정
      console.log('선택된 별의 갯수:', selectedStars);
      
      setPoint(selectedStars);
      setShowCard(true);
      setEnroll(true);
    } else {
      console.log('이미지를 선택해주세요.');
    }
 
  };
  // const [fetchImg, setFetchImg] = useState(['']);
  // const [title, setTitle] = useState([''])
  const handleCardUpload = async () => {
    if (!enroll) {
      Swal.fire({
        icon: 'warning',
        title: '미리보기확인',
        text: '미리보기를 눌러 확인해주세요',
      })
    }
    if (!selectedImage) {
      Swal.fire({
        icon: 'warning',
        title: '이미지!!',
        text: '이미지를 채워주십시오.',
      });
      return;
    }
    if (!name) {
      Swal.fire({
        icon: 'warning',
        title: '제목!!',
        text: '제목을 채우고 미리보기로 확인해주세요.',
      });
      return;
    }
    if (!subTitle) {
      Swal.fire({
        icon: 'warning',
        title: '부제목!!',
        text: '부제목을 채워주십시오.',
      });
      return;
    }
    if (!point) {
      Swal.fire({
        icon: 'warning',
        title: '별점 X',
        text: '별점을 채워주십시오.',
      });
      return;
    }


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
      console.log('성공적인 요청을 보냈습니다.:', response.data);
      await handleReset();
      setEnroll(false);
      closeModal();
    } catch (error) {
      console.error('POST 과정 중 실패하였습니다.:', error);
    }
  };
  const [inputValue, setInputValue] = useState('');

  
  
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
    <div className='makebox'>
      <h3>카드 만들기</h3>
      <input 
      id='name' 
      className='showingbox' 
      placeholder='이름' 
      maxLength={15}
      onInput={handleInputChange}
      />
      <input id='sub_Title' className='showingbox' placeholder='부제목' onInput={handleInputChange} />

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
      <div className='gridbox'>
      <button className='button' onClick={handleCardUpload}>등록하기</button>
      <button onClick={showCard ? showTrue: handlePreview} className='button'>
        {showCard ? '다시 만들기' : '미리보기'}
      </button>
      {/* <button onClick={fetchSomeData}>GET 요청 보내기</button> */}
      </div>

      <div className='margincard'>
        {showCard && name && imageUrl && subTitle && (
          <div>
            <CardX userId={userId} name={name} fetchSomeData={fetchSomeData} imageUrl={imageUrl} subTitle={subTitle} point={point} />
          </div>
        )}

      
      </div>
    </div>
  );
}


  function Deckintroduce({ userId, selectedCardIds, responseData, rescard, closeModals }) {
    const [deckTitle, setDeckTitle] = useState('');
    const [deckDescription, setDeckDescription] = useState('');
    // const [repCard, setRepCard] = useState(null); // 대표 카드 정보 상태
    const [repCardIdToSend, setRepCardIdToSend] = useState(''); // 대표 카드 ID 상태

    console.log(rescard)
    console.log(selectedCardIds)





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
          });
      } else {
        console.log('카드가 부족합니다.');
      }
    };
    

    
 
    return (
      <div className='makebox'>
        <h3>덱 등록하기</h3>
        <input
          className='showingbox'
          placeholder='이름'
          value={deckTitle}
          onChange={event => setDeckTitle(event.target.value)}
        />
        <input
          className='introducebox'
          placeholder='덱 소개글'
          value={deckDescription}
          onChange={event => setDeckDescription(event.target.value)}
        />
        <button onClick={handleDeckUpload}>등록하기</button>

      </div>
    );
  }
  



export default CardFactory;