import './Room.scss';
// import {Link} from'react-router-dom';
import Card_backup from '../../components/Card/Card_backup';

function Room() {
  return (
    <div className="Room">
      <div className="Time">
        시간 제한
      </div>
      <div className="Room1">
        <div className="Room1-1">
            <div className="Room1-1-1">
                zz  
            </div>
            <div className="Room1-1-2">
                zz  
            </div>
            <div className="Room1-1-3">
            </div>
            <div className="Room1-1-4">
                zz  
            </div>
            <div className="Room1-1-5">
                zz  
            </div>
        </div>
        <div className="Room1-2">
            <div className="Room1-2-1">
                <p>닉네임</p>
                <img className="인물1" src='src\assets\인물사진.png'></img>
            </div>
            <div className="Room1-2-2">
                <p>닉네임</p>
                <img className="인물2" src='src\assets\인물사진.png'></img>
            </div>
            <div className="Room1-2-3">
            </div>
            <div className="Room1-2-4">
                <p>닉네임</p>
                <img className="인물2" src='src\assets\인물사진.png'></img>  
            </div>
            <div className="Room1-2-5">
                <p>닉네임</p>
                <img className="인물4" src='src\assets\인물사진.png'></img>
            </div>
        </div>
      </div>
      <div className="Room2">
        <div className="Room2-1">
            <div className="Room2-1-1">
                <Card_backup width={50}
                    height={75}
                    img_url="./sample_imgs/winter.png"
                    bg_url="./sample_imgs/background.png"
                    subtitle="에스파"
                    title="윈터"></Card_backup>
            </div>    
            <div className="Room2-1-2">
                <Card_backup width={50}
                    height={75}
                    img_url="./sample_imgs/winter.png"
                    bg_url="./sample_imgs/background.png"
                    subtitle="에스파"
                    title="윈터"></Card_backup>
            </div>    
            <div className="Room2-1-3">
            <Card_backup width={150}
                    height={225}
                    img_url="./sample_imgs/winter.png"
                    bg_url="./sample_imgs/background.png"
                    subtitle="에스파"
                    title="윈터"></Card_backup>
            </div>    
            <div className="Room2-1-4">
                <div className="Room2-1-4-1">
                <Card_backup width={50}
                    height={75}
                    img_url="./sample_imgs/winter.png"
                    bg_url="./sample_imgs/background.png"
                    subtitle="에스파"
                    title="윈터"></Card_backup>
                </div>    
                <div className="Room2-1-4-2">
                    zz
                </div>    
            </div>    
            <div className="Room2-1-5">
            <Card_backup width={50}
                    height={75}
                    img_url="./sample_imgs/winter.png"
                    bg_url="./sample_imgs/background.png"
                    subtitle="에스파"
                    title="윈터"></Card_backup>
            </div>    
        </div>    
        <div className="Room2-2">
            <div className='Room2-2-1'>
                <p>닉네임</p>
                <img className="인물5" src='src\assets\인물사진.png'></img>
            </div>
            {['Room2-2-2','Room2-2-3','Room2-2-4','Room2-2-5','Room2-2-6','Room2-2-7','Room2-2-8','Room2-2-9','Room2-2-10','Room2-2-11'].map(function(a, i){
                return(
                    <div key={i} className={a}>
                    zz
                    </div>
                )})}
        </div>    
      </div>    
    </div>
  );
}

export default Room;
