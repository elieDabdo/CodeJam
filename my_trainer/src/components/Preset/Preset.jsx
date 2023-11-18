import React, {useContext} from 'react';
import './Preset.css';
import ThemeContext from '../../App';

const BoxWithPictureAndTitle = ({ pictureUrl, title, video }) => {
  let [videoAsset, setVideoAsset] = useContext(ThemeContext);
  let changeVideoAsset = () => {
    setVideoAsset(video);
  }
  return (
    <div className="preset">
      <a onclick='changeVideoAsset' to="/game"><h2>{title}</h2></a>
      <img src={pictureUrl} alt="Box Picture" />
    </div>
  );
};

export default BoxWithPictureAndTitle;
