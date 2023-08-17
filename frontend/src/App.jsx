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
// import CardMarket from './pages/CardMarket/CardMarket';
// import Mypage from './pages/MyPage/MyPage';
// import RoomList from './pages/RoomList/RoomList';
// import Room from './pages/Room/Room';
import Game from './pages/Game/Game';
import GameUI from './pages/GameUI/App';
import GameRoom from './pages/GameRoom/GameRoom';
import MVP from './pages/MVP/MVP';
// import Cccc from './pages/Main/MainContent' 
import ResultModal2 from './components/ResultModal2';
import CreateRoomModal from './components/CreateRoomModal/CreateRoomModal';
import PrivateRoute from './components/PrivateRoute';

function App() {
  [];
  const access = localStorage.getItem('accessToken');
  // const access2 = sessionStorage.getItem('roomId');
  return (
    <Router>
      <AnimatePresence>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/Login2" element={<KakaoLogin />} />
            <Route path="/Tutorial" element={<Tutorial />} />
            <Route path="/Main" element={<Main/>}/>
            {/* <Route path="/RoomList" element={<RoomList />} /> */}
            {/* <Route path="/WebMain" element={[<Header />, <WebMain />]} /> */}
            <Route path="/CardFactory" element={[ <CardFactory />]} />
            {/* <Route path="/CardMarket" element={[<Header />, <CardMarket />]} /> */}
            {/* <Route path="/Mypage" element={[<Header />, <Mypage />]} /> */}
            {/* <Route path="/WebMain" element={[<Header />, <WebMain />]} /> */}
            {/* <Route path="/Room" element={<Room />} /> */}
            <Route path="/main/game" element={<Game />} />
            <Route path="/MVP" element={<MVP />} />
            <Route path="/GameUI" element={<GameUI />} />
            <Route path="/GameRoom" element={<GameRoom />} />
            {/* <Route path="/cccc" element={<Cccc />} /> */}
            <Route path="/ResultModal" element={<ResultModal2 />} />
            <Route path="/CreateRoomModal" element={<CreateRoomModal/>} />



            {/* <Route path="/Main" element={<PrivateRoute authenticated={access} component={<Main/>}/>} /> */}
            <Route path="/WebMain" element={<PrivateRoute authenticated={access} component={[<Header />, <WebMain />]}/>}/>
            {/* <Route path="/CardFactory" element={<PrivateRoute authenticated={access} component={[<Header />, <CardFactory />]} />}/> */}
            {/* <Route path="/CardMarket" element={<PrivateRoute authenticated={access} component={[<Header />, <CardMarket />]} />}/> */}
            {/* <Route path="/Mypage" element={<PrivateRoute authenticated={access} component={[<Header />, <Mypage />]} />}/> */}
            <Route path="/CreateRoomModal" element={<PrivateRoute authenticated={access} component={<CreateRoomModal/>} />}/>
            {/* <Route path="/GameRoom" element={<PrivateRoute authenticated={access2} component={<GameRoom />} />}/> */}
          </Routes>
        </div>
      </AnimatePresence>
    </Router>
  );
}

export default App;
