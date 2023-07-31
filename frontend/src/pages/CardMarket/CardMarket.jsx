import './CardMarket.css';
import { useState } from 'react';

function CardMarket(props) {

    const [isDeckIntro, setIsDeckIntro] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
    const cardsPerPage = 4;
  
    const openDeck = (card) => {
      setSelectedCard(card);
      setIsDeckIntro(true);
    };
  
    const closeDeck = () => {
      setSelectedCard(null);
      setIsDeckIntro(false);
    };
  
    // 가상의 카드 리스트 예시 (실제 데이터로 대체해야 합니다.)
    const cardList = [
      { id: 1, title: '카드1' },
      { id: 2, title: '카드2' },
      { id: 3, title: '카드3' },
      { id: 4, title: '카드4' },
      { id: 5, title: '카드5 '},
      { id: 6, title: '게임1' }
      // ...
    ];
  
    // 현재 페이지에 해당하는 카드 리스트를 가져오는 함수
    const getCurrentCards = () => {
      const filteredCards = cardList.filter((card) =>
        card.title.includes(searchTerm) // 검색어와 일치하는 카드만 필터링
      );
  
      const indexOfLastCard = currentPage * cardsPerPage;
      const indexOfFirstCard = indexOfLastCard - cardsPerPage;
      return filteredCards.slice(indexOfFirstCard, indexOfLastCard);
    };
  
    // 페이지 번호를 클릭했을 때 페이지 변경하는 함수
    const handlePageClick = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
      setCurrentPage(1); // 검색어가 변경되면 페이지를 1로 초기화
    };
  
    return (
      <div className="CardMarket">
        카드 나눔터
        <div id="inputbox">
          <input
            id="marin"
            className="inputtag"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="검색어를 입력하세요"
          />
          <button id="marin" className="search">
            검색
          </button>
        </div>
        <div className="gridcard">
          {getCurrentCards().map((card) => (
            <div key={card.id} id="cardboard" onClick={() => openDeck(card)}>
              <Pcard1 title={card.title} />
            </div>
          ))}
        </div>
        <Modal isOpen={isDeckIntro} closeModal={closeDeck}>
          {selectedCard && <Deckintro title={selectedCard.title} />}
        </Modal>
        <Pagination
          cardsPerPage={cardsPerPage}
          totalCards={cardList.length}
          currentPage={currentPage}
          onPageChange={handlePageClick}
          className='page'
        />
      </div>
    );
  }

// Modal 컴포넌트
function Modal({ isOpen, closeModal, children }) {
  if (!isOpen) return null;

  return (
    <div>
      <div className="modal-background" onClick={closeModal}></div>
      <div className="Deckbox">
        {children}
      </div>
    </div>
  );
}

// 이하 생략

// Pagination 컴포넌트
function Pagination({ cardsPerPage, totalCards, currentPage, onPageChange }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {/* 왼쪽 화살표 */}
      {currentPage > 1 && (
        <ArrowButton direction="left" onClick={() => onPageChange(currentPage - 1)} />
      )}

      {/* 페이지 번호들 */}
      {pageNumbers.map((number) => (
        <span
          key={number}
          className={number === currentPage ? 'active' : ''}
          onClick={() => onPageChange(number)}
        >
          {number}
        </span>
      ))}

      {/* 오른쪽 화살표 */}
      {currentPage < pageNumbers.length && (
        <ArrowButton direction="right" onClick={() => onPageChange(currentPage + 1)} />
      )}
    </div>
  );
}

// ArrowButton 컴포넌트
function ArrowButton({ direction, onClick }) {
  return (
    <span className={`arrow-button ${direction}`} onClick={onClick}>
      {direction === 'left' ? '<' : '>'}
    </span>
  );
}

// Pcard1 컴포넌트
function Pcard1({ title }) {
  return (
    <div className="pcard-container">
      <div className="pcard-header">
        <h4>{title}</h4>
      </div>
      <div className="pcard-footer">
        <span>좋아요</span>
        <span>사용횟수</span>
        <span>제작자</span>
      </div>
    </div>
  );
}

// Deckintro 컴포넌트
function Deckintro({ title }) {
  return (
    <div>
      <div id="factory">
        <h3 className="bold">카드 덱 이름: {title}</h3>
        <p className="introbox">카드 덱 소개글</p>
        <span className="bold">좋아요</span>
        <span className="bold">사용횟수</span>
        <button className="button">담기/빼기</button>
        <div className="reviewsbox"   style={{overflowY: 'auto', height:'120px'}}>
          <Reviews />
          <Reviews />
          <Reviews />
          <Reviews />
        </div>
      </div>
    </div>
  );
}

// Reviews 컴포넌트 (이전과 동일하게 유지)
function Reviews(props) {
  return (
    <div className="gridprivate">
      <p className="profilebox">프로필 사진</p>
      <p className="reviewbox">사용후기글</p>
    </div>
  );
}

// Cards 컴포넌트 (이전과 동일하게 유지)
function Cards(props) {
  return <div></div>;
}

export default CardMarket;
