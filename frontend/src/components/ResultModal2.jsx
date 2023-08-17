import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './ResultModal2.css';
// import useDidMountEffect from './useDidMountEffect';


function ResultModal() {
    const [modal, setModal] = React.useState(true);
    const winner = [{userId:1, nickname:'홍길동', score:'10'},{userId:1, nickname:'홍길동', score:'10'},{userId:1, nickname:'홍길동', score:'10'}]
  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          className="modal"
          initial={{opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        >
            {/* ---모달 안------------------------------------- */}
            <div className="form-container">
                <p onClick={() => setModal(modal => !modal)} className="form-exit">
                &times;</p>
                <div className="confetti">
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                  <div className="confetti-piece"></div>
                </div>
                <div>
                <h1 style={{
                 'display':'flex',
                 'justifyContent': 'center',}}
                 >Winner!</h1>
                {/* <p>결과창 들어갈 내용</p>
                <p>1. 등수: 1등 1명만? 여러명?</p>
                <p>2. 기준: 몇점인지? 몇장내려놨는지?</p>
                <p>3. 어떻게 보여줄건지?</p> */}
                
                <div style={{
                 'display':'flex',
                 'justifyContent': 'center',
                 'margin':'10px'}}>
                {winner.map(function(a, i){
                    return(
                    <div key={i} 
                         className={a}
                         style={{
                          'border':'solid',
                          'width':'15vw', 
                          'height':'200px',
                          'display':'flex',
                          'flexDirection': 'column',
                          'justifyContent': 'center',
                          'alignItems': 'center',
                          'margin':'10px'}}>
                            <div style={{
                              'width':'100%',
                          'height':'100%',
                          'display':'flex',
                          'flexDirection': 'column',
                          'justifyContent': 'center',
                          'alignItems': 'center',
                          }}>
                              {a.userId}
                            </div>
                            <div style={{
                              'width':'100%',
                          'height':'100%',
                          'display':'flex',
                          'flexDirection': 'column',
                          'justifyContent': 'center',
                          'alignItems': 'center',
                          }}>
                              {a.nickname}
                              </div>
                            <div style={{
                              'width':'100%',
                              'height':'100%',
                          'display':'flex',
                          'flexDirection': 'column',
                          'justifyContent': 'center',
                          'alignItems': 'center',
                          }}>
                              {a.score}
                              </div>
                    </div>)})}
                </div>
                <p></p>
                </div>
            </div>
           {/* ----------------------------------------------- */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ResultModal;