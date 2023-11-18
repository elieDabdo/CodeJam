import logo from './logo.svg';
import './App.css';
import Playback from './components/Playback';
import Home from './components/Home';
import NavBar from './components/NavBar/NavBar';
import Game from './components/Game/Game';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';

export const ThemeContext = React.createContext();

function App() {
  let [videoAsset,setVideoAsset] = useState(null);
  return (

    <div className="App">
      <NavBar/>
      <Routes>
        <ThemeContext.Provider value={[videoAsset,setVideoAsset]}>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/game" element={<Game/>} />
        </ThemeContext.Provider>
      </Routes>
    </div>
  );
}

export default App;
