import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
// import './Main.css';
// import axios from "axios";
// import useDidMountEffect from './useDidMountEffect';

function Modal() {
    const [modal, setModal] = React.useState(true);
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
                <div>
                <p>결과창 들어갈 내용</p>
                <p>1. 등수: 1등 1명만? 여러명?</p>
                <p>2. 기준: 몇점인지? 몇장내려놨는지?</p>
                <p>3. 어떻게 보여줄건지?</p>
                
                <div style={{
                 'display':'flex',
                 'margin':'10px'}}>
                <div style={{'border':'solid',
                 'width':'15vw', 
                 'height':'200px',
                 'display':'flex',
                 'margin':'10px'}}>
                    네모
                </div>
                <div style={{'border':'solid', 'width':'200px', 'height':'200px', 'margin':'10px'}}>
                    네모
                </div>
                <div style={{'border':'solid', 'width':'200px', 'height':'200px', 'margin':'10px'}}>
                    네모
                </div>
                <div style={{'border':'solid', 'width':'200px', 'height':'200px', 'margin':'10px'}}>
                    네모
                </div>
                <div style={{'border':'solid', 'width':'200px', 'height':'200px', 'margin':'10px'}}>
                    네모
                </div>
                     </div>
                <p></p>
                zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
                </div>
            </div>
           {/* ----------------------------------------------- */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;