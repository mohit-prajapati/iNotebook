import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Components/Home';
import About from '../Components/About';

const Router = () => {
  return (
    <>
        <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/about" element={<About/>}></Route>
        </Routes>    
    </>
  )
}

export default Router
