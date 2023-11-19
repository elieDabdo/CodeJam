
import React, {useLocation} from 'react-router-dom';
import Playback from '../Playback';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ScrollToTop from '../ScrollToTop';
import './Game.css';

const Game = () => {
    const location = useLocation();
    const video = location.state.video;
    return (
        <>
          <div className="game-container">
            <Navbar />
            <ScrollToTop />
            <Playback video_url={video} user_params={
                {
                  training_video_maximized:true,
                  draw_webcam_skeleton_on_webcam:false,
                  draw_webcam_skeleton_on_training:true,
                  draw_training_skeleton_on_training:false,
                  draw_training_skeleton_on_webcam:true
                }} />
            <Footer />
          </div>
        </>
    );
};

export default Game;
