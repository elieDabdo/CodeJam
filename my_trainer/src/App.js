import logo from './logo.svg';
import './App.css';
import Playback from './components/Playback';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        MyTrainer
      </header>
      <Playback video_url="https://www.youtube.com/watch?v=j7rKKpwdXNE&ab_channel=YogaWithAdriene" />
    </div>
  );
}

export default App;
