import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from './pages/Landing/Landing';
import Tutorial from './pages/Tutorial/Tutorial';
import Main from './pages/Main/Main';
import Header from './components/Header/Header';
import WebMain from './pages/WebMain/WebMain';
import KakaoLogin from './pages/Login/kakaoLogin';
import CardFactory from './pages/CardFactory/CardFactory';
import CardMarket from './pages/CardMarket/CardMarket';
import Mypage from './pages/MyPage/MyPage';
import RoomList from './pages/RoomList/RoomList';
import Game from './pages/Game/Game';
import GameUI from './pages/GameUI/App';
import GameRoom from './pages/GameRoom/GameRoom';
import ResultModal2 from './components/ResultModal2';

function App() {
  [];
  return (
    <Router>
      <AnimatePresence>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/Login2" element={<KakaoLogin />} />
            <Route path="/Tutorial" element={<Tutorial />} />
            <Route path="/Main" element={<Main />} />
            <Route path="/RoomList" element={<RoomList />} />
            <Route path="/WebMain" element={[<Header />, <WebMain />]} />
            <Route path="/CardFactory" element={[<Header />, <CardFactory />]} />
            <Route path="/CardMarket" element={[<Header />, <CardMarket />]} />
            <Route path="/Mypage" element={[<Header />, <Mypage />]} />
            <Route path="/WebMain" element={[<Header />, <WebMain />]} />
            {/* <Route path="/Room" element={<Room />} /> */}
            <Route path="/main/game" element={<Game />} />
            <Route path="/GameUI" element={<GameUI />} />
            <Route path="/GameRoom" element={<GameRoom />} />
            {/* <Route path="/cccc" element={<Cccc />} /> */}
            <Route path="/ResultModal" element={<ResultModal2 />} />
          </Routes>
        </div>
      </AnimatePresence>
    </Router>
  );
}

export default App;
