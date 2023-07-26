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
        
    )
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

export default CardMarket;