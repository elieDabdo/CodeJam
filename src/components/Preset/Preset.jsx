import React from 'react';
import { useNavigate } from "react-router-dom"
import './Preset.css';

const Preset = ({ pictureUrl, title, video }) => {
  const navigate = useNavigate();

  return (
    <div className="preset">
      <button onClick={()=>navigate('/game', {state: {video: video}})}>{<h2>{title}</h2>}</button>
      <img src={pictureUrl} alt="Box Picture" />
    </div>
  );
};

export default Preset;
