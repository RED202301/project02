import './Tutorial.css';
import {Link} from'react-router-dom';
import card_image from './card-image.png';
import SimpleSlider from '../SimpleSlider';

function Tutorial(){

    return (
        <div className="Tutorial">
            <SimpleSlider/>
            <div className='Logo'>
                <h1>
                Tutorial!
                </h1>
            </div>
    <div className='a'>
        <div>
            <div className='Logo'>
                <h1>
                카드구성
                </h1>
            </div>
            <div className='Description'>
                <img className='card_image' src={card_image} />
                예시) 별 나라 수도
            </div>
        </div>
        <div>
            <div className='Logo'>
                <h1>
                게임목적
                </h1>
            </div>
            <div className='Description'>
            같은 단어 카드를 최대한 많이 찾으세요. 같은 단어 카드 2장을 모으면 자기 앞에 내려놓을 수 있습니다.
            </div>
        </div>
        <div>
            <div className='Logo'>
                <h1>
                게임종료와 승리조건
                </h1>
            </div>
            <div className='Description'>
            손에 카드가 1장도 없는 사람이 있다면, 즉시 게임 끝. 게임이 끝나면, 각자 자기 앞에 내려놓은 카드의 별 갯수를 더해 최종 승자, 동점이라면 손의 카드가 더 적은사람이 이김
            </div>
        </div>
    </div>        
        <div>
            <div className='Logo'>
                <h1>
                게임진행
                </h1>
            </div>
            <div className='Description'>
            1. 선부터 자기 손에 있는 카드 1장을 골라, 모든 사람이 볼 수 있게 테이블에 내려 놓는다.
            2. 같이 게임을 하는 사람 중 1명을 지목하여 방금 내려 놓은 카드와 같은 단어 카드가 있는지 질문한다.
            3. 지목받은 사람이 해당 단어 카드를 가지고 있다면, 성공
            </div>
        </div>
        <div>
            <div className='Logo'>
                <h1>
                게임준비
                </h1>
            </div>
            <div className='Description'>
            4~5명이 게임을 하는 경우 50장 사용, 2~3명이 게임을 하는 경우 30장 사용
            한사람당 5장씩 나눠줌
            남는 카드는 덱
            </div>
        </div>

            <div className="back">
                <Link to="/">
                <span>
                    ⬅
                </span>
                </Link>
            </div>
        </div>
    )
}

export default Tutorial;