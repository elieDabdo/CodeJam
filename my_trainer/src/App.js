import logo from './logo.svg';
import './App.css';
import Playback from './components/Playback';
import Home from './components/Home';
import yogaVideo from './assets/yoga.mp4'

function App() {
  return (
    <div className="App">
      <Playback video_url={yogaVideo} user_params={{training_video_maximized:true}} />
    </div>
  );
}

export default App;
