import './Landing.css';
import {Link} from'react-router-dom';
import {motion} from 'framer-motion';
// import {useState} from 'react'

function Landing(){
    // const [PIN, setPIN] = useState(null);
    // const savePIN = event => {
    //     setPIN(event.target.value);
    //     console.log(event.target.value);
    //   };
    return (
        <motion.div>

        <div className="Landing">
            <div className='LOGO'>
            <h1>Ssafish!</h1>
            </div>
            <div className="PIN">
            {/* <div className='InputContainer'>
            <input className='input' placeholder="게임 PIN"></input> */}
            <div className="container">
                <input required="게임 PIN" type="text" name="text" className="input"/>
                <label className="label">게임 PIN</label>
            </div>
            <Link to=''>
                   <button className='btn'>
                    확인
                    </button>
            </Link>
            </div>
            <div className="LOGTUTO">
                <Link to='/Login'>
                <span>Login</span>
                </Link>
                |
                <Link to='/Tutorial'>
                <span>Tutorial</span>
                </Link>
            </div>
        </div>
        </motion.div>
    )
}


export default Landing;
