import './MyPage.css';

function MyPage() {
  return (
    <div className="MyPage">
      마이 페이지
      <div className="gridX">
        <div>
          <Profile></Profile>
        </div>
        <div className="deckmargin">
          <Deckget></Deckget>
        </div>
      </div>
    </div>
  );
}

function Deckget(props) {
  return (
    <div className="introboxs">
      <h3>내 덱 보관함</h3>
    </div>
  );
}

function Profile(props) {
  let username = '닉네임';
  let playcount = '100판';
  return (
    <div className="userprofile">
      <div className="gridX">
        <p className="profilebox2">프로필 사진</p>
        <p className="nickname">{username}</p>
        <div className="gridrow">
          <button className="buttonoption">변경</button>
          <button className="buttonoption">탈퇴</button>
        </div>
      </div>
      <div className="grids">
        <Cardimg />
        <div className="margin">
          경험치
          <p className="exp">
            <span className="expbar"></span>
          </p>
          <p className="tran">
            <span>플레이 횟수</span>
            <span className="trans">{playcount}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Cardimg(props) {
  return (
    <div>
      <p className="cardimg">카드사진</p>
    </div>
  );
}
// function Profile(props) {
//   return (
//     <div>

//     </div>
//   )
// }

export default MyPage;
