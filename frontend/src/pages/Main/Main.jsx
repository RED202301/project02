import React, { useState, useEffect } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
import './Main.css';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import useDidMountEffect from '../../components/useDidMountEffect';
import { useNavigate } from 'react-router-dom';
import MainContent from './MainContent'
// import Sidebar from '../../components/Sidebar/Sidebar';

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
        </div>
        <div>
        </div>
      </div>
      
      <div className="room">
          <MainContent></MainContent>
      </div>
    </div>
  );
}

export default Main;
