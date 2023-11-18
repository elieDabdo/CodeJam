import React from 'react';
import './Preset.css';

const BoxWithPictureAndTitle = ({ pictureUrl, title }) => {
  return (
    <div className="preset">
      <h2>{title}</h2>
      <img src={pictureUrl} alt="Box Picture" />
    </div>
  );
};

export default BoxWithPictureAndTitle;
