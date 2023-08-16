import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './Main.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import useDidMountEffect from '../../components/useDidMountEffect';
import { useNavigate } from 'react-router-dom';
import Cccc from './cccc'
import Sidebar from '../../components/Sidebar/Sidebar';

const base_URL = import.meta.env.VITE_SERVER_URL;

function Main() {
  const navigate = useNavigate();
  const accessToken = window.localStorage.getItem('accessToken');
  useEffect(() => {
    if (!accessToken){
      navigate('../')
    }
  })
  return (
    <div className="Main">
      <div className="web">
        <div style={{ margin: '30px', marginBottom: '0px' }}>
          {/* <Link to="/webmain" style={{ borderRadius: '7px', backgroundColor: '#D4A389' }}>
            웹페이지 GO
          </Link> */}
        </div>
        <div>
        </div>
      </div>
      
      <div className="room">
          <Cccc></Cccc>
      </div>
    </div>
  );
}

export default Main;
