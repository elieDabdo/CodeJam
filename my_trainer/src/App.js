import logo from './logo.svg';
import './App.css';
import Playback from './components/Playback';
import Home from './components/Home';


function App() {
  return (
    <div className="App">
      <Playback video_url={process.env.PUBLIC_URL + "/my_trainer/src/assets/yoga.mp4"} />
    </div>
  );
}

export default App;
