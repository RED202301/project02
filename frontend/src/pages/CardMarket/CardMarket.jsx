import './CardMarket.css';

function CardMarket(){
  return (
    <div className="CardMarket">
      카드 나눔터
   
      <div id="inputbox">
        <input id="marin" className='inputtag'></input>
        <button id="marin" className='search'>검색</button>
      </div>
      <div className="gridcard">
        <div id="cardboard">
    
          <Pcard1></Pcard1>
        </div>
        <div id="cardboard">
          <Pcard1></Pcard1>
        </div>
        <div id="cardboard">
          <Pcard1></Pcard1>
        </div>
        <div id="cardboard">
          <Pcard1></Pcard1>
        </div>
      </div>
    </div>
        
  );
}

function Pcard1(props) {
  return (
    <div className="pcard-container">
      <div className="pcard-header">
        <h4>카드 이름</h4>
      </div>
      <div className="pcard-footer">
        <span>좋아요</span>
        <span>사용횟수</span>
        <span>제작자</span>
      </div>
    </div>
  );
}

// 덱소개글 모달

  // function Deckintro(props) {
  //   return (
  //     <div>
        
  
  //       <div id="factory">
  //       <h3 className='bold'>카드 덱 이름</h3>
  //       <p className='introbox'>카드 덱 소개글</p>
  //       <span className='bold'>좋아요</span>
  //       <span className='bold'>사용횟수</span>
  //       <button className='buttonbox'>담기/빼기</button>
  //       <div className='reviewsbox'>
  //       <Reviews/>
  //       </div>
  
  //   {/* <span>덱 등록하기 </span>
  //   <span>대표카드 지정</span> */}
  //   </div>
  //   </div>
  //   )
  // }
  
  // function Reviews(props) {
  //   return (
  //     <div className='gridprivate'>
  //       <p className='profilebox'>프로필 사진</p>
  //       <p className="reviewbox">사용후기글</p>
  //     </div>
  //   )
  // }
  
  // function Cards(props) {
  //   return (
  //     <div>
  
  // </div>
  //   )
  // }
export default CardMarket;