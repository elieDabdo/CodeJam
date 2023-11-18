import logo from './logo.svg';
import './App.css';
import Playback from './components/Playback';
import Home from './components/Home';
import NavBar from './components/NavBar/NavBar';
import Game from './components/Game/Game';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';


function App() {
  return (

    <div className="App">
      <NavBar/>
        <Routes>
            <Route exact path="/CodeJam" element={<Home/>} />
            <Route exact path="/game" element={<Game/>} />
        </Routes>

    </div>
  );
}

export default App;
