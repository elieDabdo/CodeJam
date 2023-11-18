
import React, {useLocation} from 'react-router-dom';
import Playback from '../Playback';

const Game = () => {
    const location = useLocation();
    const video = location.state.video;
    console.log(video);
    return (
        <Playback video_url={video} user_params={
            {
              training_video_maximized:true,
              draw_webcam_skeleton_on_webcam:true,
              draw_webcam_skeleton_on_training:true,
              draw_training_skeleton_on_training:true,
              draw_training_skeleton_on_webcam:true
            }} />
    );
};

export default Game;
