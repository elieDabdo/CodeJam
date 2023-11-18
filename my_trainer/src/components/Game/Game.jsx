
import React, {useLocation} from 'react-router-dom';


const Game = () => {
    const location = useLocation();
    const video = location.state.video;
    console.log(video);
    return (
        <div>
        </div>
    );
};

export default Game;
