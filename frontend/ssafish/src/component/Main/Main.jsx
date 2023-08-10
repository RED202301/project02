import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import './Main.css';
import { Link } from 'react-router-dom';


  function Modal({ modal, setModal }) {
    return (
      <AnimatePresence>
        {modal && (
          <motion.div className="modal"
              initial={{ y: 50, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1
              }}
              exit={{
                y: -50,
                opacity: 0
              }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            >
            <div className="modal-content">
                <div className="room-btn-div">
                    <button
                        onClick={() => setModal((modal) => !modal)}
                        className="room-btn"
                        >
                        &times;
                    </button>
                </div>
      <div>
                <h1 className="modal-title">방 만들기</h1>
                <p>방 제목</p>
                <p>게임 선택</p>
                <p>덱 선택</p>
                <p>턴 제한 시간</p>
                <p>인원 제한</p>
                <button className="modal-enter">생성</button>
      </div>
                  </div>
            </motion.div>
        )}
      </AnimatePresence>
    );
  }

function Main(){
    const [modal, setModal] = React.useState(false);

    return (
        <div className="Main">
            메인 페이지
            <div className='web'>
            <Link to='/webmain'>
                웹페이지
            </Link>
            </div>
            <div className='room'>
            <Modal {...{ modal, setModal }} />
                <div className='create' onClick={() => setModal((modal) => !modal)}>
                  <div className="create2">
                    방만들기
                  </div>
                </div>
                <div className='enter'>
                  <div className="enter2">
                <Link to="/RoomList">
                    방들어가기
                </Link>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default Main;