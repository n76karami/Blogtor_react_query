import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const WebLayout = () => {
  

  return (
    <>  
      
      <Navbar />
      <Outlet />

    </>
  )
}

export default WebLayout;