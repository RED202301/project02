import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Tutorial.css';
import { Link } from 'react-router-dom';
import card_image from './card-image.png';
import ResultModal from '../../components/ResultModal';


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
      autoplaySpeed: 3000,
    };
    return (
      <div className="Tutorial">
        <h1 className="title"> Tutorial!</h1>
        <Slider {...settings}>
          <div>
            <div>
              <div className="Logo">
                <h1>카드구성</h1>
              </div>
              <div className="Description">
                <br />
                <img className="card_image" src={card_image} />
                <p>예시) 별 나라 수도</p>
              </div>
            </div>
          </div>
          <div>
            <div className="Logo">
              <h1>게임목적</h1>
            </div>
            <div className="Description">
              <p>같은 단어 카드를 최대한 많이 찾으세요. </p>
              <p>같은 단어 카드 2장을 모으면 자기 앞에 내려놓을 수 있습니다.</p>
            </div>
          </div>
          <div>
            <div className="Logo">
              <h1>게임진행</h1>
            </div>
            <div className="Description">
              <p>1. 선부터 자기 패에 있는 카드 1장을 골라 선택한다</p>
              <p>2. 다른 플레이어 1명을 지목하여 방금 선택한 카드와 같은 카드가 있는지 질문한다.</p>
              <p>3. 지목받은 사람이 해당 단어 카드를 가지고 있다면, 성공!</p>
              <p>-성공 시 카드를 자기 앞에 가져오고 1번 부터 다시 반복한다</p>
              <p>4. 실패 시, 덱에서 카드 1장을 가져오고 턴 종료</p>
            </div>
          </div>
          <div>
            <div className="Logo">
              <h1>게임종료와 승리조건</h1>
            </div>
            <div className="Description">
              <p>손에 카드가 1장도 없는 사람이 있다면, 즉시 게임 끝. </p>
              <p>게임이 끝나면, 각자 자기 앞에 내려놓은 카드의 별 갯수를 더해 최종 승자를 가림!</p>
              <p>동점이라면 손의 카드가 더 적은사람이 승자!</p>
            </div>
          </div>
          <div>
            <div className="Logo">
              <h1>게임준비</h1>
            </div>
            <div className="Description">
              <p>4~5명이 게임을 하는 경우 50장 사용</p>
              <p>2~3명이 게임을 하는 경우 30장 사용</p>
              <p>한사람당 5장씩 나눠줌</p>
              <p>남는 카드는 덱으로 사용</p>
            </div>
          </div>
        </Slider>
        <br></br>
        <br></br>
        <br></br>
        <div className="back">
          <Link to="/">
            <span>⬅</span>
          </Link>
        </div>
      </div>
    );
  }
}
