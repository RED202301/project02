import './CardFactory.css';

function CardFactory(){
    return (
        <div className="CardFactory">
            카드 공방
      <div className="grid">
      
      <div>
      <Deckin></Deckin>
      <button id="silverborder">덱 등록하기</button>
      <button id="silverborders">대표 카드지정</button>
      </div>
      
      <div >
      <Selectin></Selectin>
      <button id="silverborder">카드 만들기</button>
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
  
        {/* <span>덱 등록하기 </span>
        <span>대표카드 지정</span> */}
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

// 카드 만들기, 상세 모달


  // function Deckmake(props) {

  //   return (
  //     <div className='makebox'>
        
  //       <p className='showingbox'>이름</p>
  //       <p className='imagebox'>카드 사진</p>
  //       <p className='showingbox'>짤막한 글</p>
  //       <div className='buttoncontain'>
  //       <button className='button'>등록하기</button>
  //       </div>
  //       </div>
  
    
  
  //   )
  // }
  
  // function Deckintroduce(props) {
  //   return (
  //     <div className='makebox'>
        
  //       <p className='showingbox'>이름</p>
  
  //   <p className='introducebox'>덱 소개글</p>
  //   <div className='buttoncontain'>
  //   <button className='button'>등록하기</button>
  //   </div>
  //   </div>
  
    
  //   )
  
  // }





export default CardFactory;