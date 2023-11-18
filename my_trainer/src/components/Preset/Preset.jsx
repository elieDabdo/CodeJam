import React, {useContext} from 'react';
import './Preset.css';

const BoxWithPictureAndTitle = ({ pictureUrl, title, video }) => {
  let [videoAsset, setVideoAsset] = useContext(VideoAssetContext);
  let changeVideoAsset = () => {
    setVideoAsset(video);
  }
  return (
    <div className="preset">
      <href to="/game"><h2>{title}</h2></href>
      <img src={pictureUrl} alt="Box Picture" />
    </div>
  );
};

export default BoxWithPictureAndTitle;
