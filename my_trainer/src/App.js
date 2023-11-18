import logo from './logo.svg';
import './App.css';
import Playback from './components/Playback';
import Home from './components/Home';
import yogaVideo from './assets/yoga.mp4'


function App() {
  return (
    <div className="App">
      <Playback video_url={yogaVideo} user_params={
        {
          training_video_maximized:true,
          draw_webcam_skeleton_on_webcam:true,
          draw_webcam_skeleton_on_training:false,
          draw_training_skeleton_on_webcam:true,
          draw_training_skeleton_on_training:false
        }} />
    </div>
  );
}

export default App;
