import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Tutorial.css';
import { Link } from 'react-router-dom';


export default class Tutorial extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 300000,
    };
    return (
      <div className="Tutorial" style={{}}>
        <h1 className="title"> Tutorial!</h1>
        <Slider {...settings}>
          <div>
            <div>
              <div className="Logo">
                <h1>튜토리얼 영상</h1>
                <span>출처: https://www.youtube.com/watch?v=8KevEfOKJas</span>
              </div>
              <div className="Description" style={{'border':'0'}}>
                {/* <iframe src="src/assets/고피쉬는 아이들에게 어떻게 도움이 될까요_.mp4" width='100%' height='100%'></iframe> */}
                {/* <embed type="video/webm" src="src/assets/고피쉬는 아이들에게 어떻게 도움이 될까요_.mp4" width="100%" height="100%"  /> */}
                <video controls controlsList="nodownload" width='auto' height='100%'>
                  <source src='src/assets/고피쉬설명.mp4' type='video/mp4'/></video>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="Logo">
                <h1>UI 설명 - 내 차례</h1>
              </div>
              <div className="Description">
                <br />
                <img className="tuto_img" src='src/assets/1인원선택.png' />
                <p>질문할 플레이어를 고르는 UI</p>
                <p>타 플레이어 주위에 초록색 표시</p>
              </div>
            </div>
          </div>
          <div>
            <div className="Logo">
            <h1>UI 설명 - 내 차례</h1>
            </div>
            <div className="Description">
            <img className="tuto_img" src='src/assets/2인원선택후.png' />
                <p>타 플레이어를 클릭하게 되면, 흰색 표시로 바뀐다</p>
                <p>클릭한 플레이어 밑에 뜬 선택 버튼을 누르면 확정</p>
            </div>
          </div>
          <div>
            <div className="Logo">
            <h1>UI 설명 - 내 차례</h1>
            </div>
            <div className="Description">
            <img className="tuto_img" src='src/assets/3카드선택.png' />
                <p>플레이어를 선택하고 나면, 카드를 낼 수 있다</p>
                <p>원하는 카드를 고른 후, 선택 버튼 클릭</p>
            </div>
          </div>
          <div>
            <div className="Logo">
            <h1>UI 설명 - 내 차례</h1>
            </div>
            <div className="Description">
            <img className="tuto_img" src='src/assets/4실패후덱.png' />
                <p>만약, 고른 상대가 내가 고른 카드를 가지고 있다면, 카드가 등록되고 한 차례 더 기회가 주어진다</p>
                <p>이에 실패한다면, 덱에서 내 패로 카드가 한장 들어오고 턴이 종료된다</p>
            </div>
          </div>
          <div>
            <div className="Logo">
            <h1>UI 설명 - 상대방 차례</h1>
            </div>
            <div className="Description">
            <img className="tuto_img" src='src/assets/5고피쉬.png' />
                <p>현재 턴인 타 플레이어는 노란색 표시가 된다. 만약, 상대방이 날 지목했다면, 내 화면에 흰색 표시가 생긴다 </p>
                <p>상대방이 고른 카드가 나에게 없다면, 상대방 밑의 고피쉬 버튼을 누른다</p>
            </div>
          </div>
          <div>
            <div className="Logo">
            <h1>UI 설명 - 상대방 차례</h1>
            </div>
            <div className="Description">
            <img className="tuto_img" src='src/assets/6카드주기.png' />
                <p>만약, 상대방이 고른 카드가 나에게 있다면,</p>
                <p>상대방에게 주기 버튼이 생긴다</p>
            </div>
          </div>
          <div>
            <div className="Logo">
            <h1>UI 설명 - 게임 종료</h1>
            </div>
            <div className="Description">
            <img className="tuto_img" src='src/assets/7게임종료.png' />
                <p>게임 참가자 중, 패에 카드가 없는 사람이 발생하면 게임이 종료된다</p>
                <p>게임이 종료되면, 이펙트와 함께 화면 상단에 우승자 닉네임이 표시된다</p>
            </div>
          </div>
          <div>
            <div className="Logo">
            </div>
            <div className="Description">
              <Link to="/">
                <h1>
                  <span>게임하러 가기</span>
                  </h1>
              </Link>
            </div>
          </div>
        </Slider>
        <br></br>
        <br></br>
        <br></br>
        <div className="back">
          <Link to="/">
            <h1>
              <span>⬅</span>
              </h1>
          </Link>
        </div>
      </div>
    );
  }
}
