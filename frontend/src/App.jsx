import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Tutorial from './pages/Tutorial/Tutorial';
import Main from './pages/Main/Main';
import Header from './components/Header/Header';
import WebMain from './pages/WebMain/WebMain';
import KakaoLogin from './pages/Login/kakaoLogin';
import CardFactory from './pages/CardFactory/CardFactory';
import CardMarket from './pages/CardMarket/CardMarket';
import Mypage from './pages/MyPage/MyPage';
import RoomList from './pages/RoomList/RoomList';
import Room from './pages/Room/Room';

import Sample from './components/backup/samples/Parallax Depth Cards';
import Card from './components/Card/Card';
import Card_backup from './components/Card/Card_backup';

function App() {
  [];
  return (
    <Router>
      <AnimatePresence>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/kakaoLogin" element={<KakaoLogin />} />
            <Route path="/Tutorial" element={<Tutorial />} />
            <Route path="/Main" element={<Main />} />
            <Route path="/RoomList" element={<RoomList />} />
            <Route path="/WebMain" element={[<Header />, <WebMain />]} />
            <Route path="/CardFactory" element={[<Header />, <CardFactory />]} />
            <Route path="/CardMarket" element={[<Header />, <CardMarket />]} />
            <Route path="/Mypage" element={[<Header />, <Mypage />]} />
            <Route path="/WebMain" element={[<Header />, <WebMain />]} />
            <Route path="/Room" element={<Room/>}/>

            <Route path="/Sample" element={<Sample />} />
            <Route
              path="/Card"
              element={
                <div
                  style={{
                    backgroundColor: 'tomato',
                    width: '100vw',
                    height: '100vh',
                  }}
                >
                  {/* {[0].map((_, idx) => (
                    <Card
                      width={'200px'}
                      height={'300px'}
                      img_url="./sample_imgs/마크_저커버그_메타.png"
                      bg_url="./sample_imgs/background.png"
                      subtitle="메타"
                      title="마크 저커버그"
                      key={idx}
                    />
                  ))} */}
                  <Card_backup
                    width={200}
                    height={300}
                    img_url="./sample_imgs/winter.png"
                    bg_url="./sample_imgs/background.png"
                    subtitle="에스파"
                    title="윈터"
                  />
                  <Card_backup
                    width={200}
                    height={300}
                    img_url="./sample_imgs/winter.png"
                    bg_url="./sample_imgs/background.png"
                    subtitle="에스파"
                    title="윈터"
                  />
                </div>
              }
            />
          </Routes>
        </div>
      </AnimatePresence>
    </Router>
  );
}

export default App;
