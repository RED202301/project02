import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './routes';
import Sample1 from './samples/3D CSS Parallax Depth Effect'
import Sample2 from './samples/Parallax Depth Cards'

export default function App() {
  return (
    <>
      <HashRouter>
        <header>
          <nav>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/sample1'>Sample1</Link></li>
              <li><Link to='/sample2'>Sample2</Link></li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sample1' element={<Sample1/>} />
          <Route path='/sample2' element={<Sample2/>} />
        </Routes>
      </HashRouter>
    </>
  )
}