
import React, {useLocation} from 'react-router-dom';
import Playback from '../Playback';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ScrollToTop from '../ScrollToTop';

const Game = () => {
    const location = useLocation();
    const video = location.state.video;
    return (
        <>
          <Navbar />
          <ScrollToTop />
          <Playback video_url={video} user_params={
              {
                training_video_maximized:true,
                draw_webcam_skeleton_on_webcam:true,
                draw_webcam_skeleton_on_training:true,
                draw_training_skeleton_on_training:true,
                draw_training_skeleton_on_webcam:true
              }} />
          <Footer />
        </>
    );
};

export default Game;
