import './App.css'
import {BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'
import Landing from './component/Landing/Landing';
import Login from './component/Login/Login';
import Tutorial from './component/Tutorial/Tutorial';
import Main from './component/Main/Main';
import Header from './component/Header/Header';
import WebMain from './component/WebMain/WebMain';
import KakaoLogin from './component/Login/kakaoLogin';
import CardFactory from './component/CardFactory/CardFactory'
import CardMarket from './component/CardMarket/CardMarket'
import Mypage from './component/MyPage/MyPage'
import RoomList from './component/RoomList/RoomList'


function App() {

  return (
    <BrowserRouter>
    <AnimatePresence>
    <div className="App">
    <Routes>
    <Route path="/" element={<Landing/>}/>
    <Route path="/Login" element={<Login/>}/>
    <Route path='/kakaoLogin' element={<KakaoLogin/>}/>
    <Route path="/Tutorial" element={<Tutorial/>}/>
    <Route path="/Main" element={<Main/>}/>
    <Route path="/RoomList" element={<RoomList/>}/>
    <Route path="/WebMain" element={[<Header/>, <WebMain/>]}/>
    <Route path="/CardFactory" element={[<Header/>, <CardFactory/>]}/>
    <Route path="/CardMarket" element={[<Header/>, <CardMarket/>]}/>
    <Route path="/Mypage" element={[<Header/>, <Mypage/>]}/>
    <Route path="/WebMain" element={[<Header/>, <WebMain/>]}/>
    </Routes>
    </div>
    </AnimatePresence>
    </BrowserRouter>
  )
}

export default App
