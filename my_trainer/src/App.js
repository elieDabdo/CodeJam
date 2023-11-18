import logo from './logo.svg';
import './App.css';
import Playback from './components/Playback';
import Home from './components/Home';
import NavBar from './components/NavBar/NavBar';
import Game from './components/Game';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  let [videoAsset,setVideoAsset] = useState(null);
  return (

    <div className="App">
      <NavBar/>
      <Routes>
        <ThemeContext.Provider value={[videoAsset,setVideoAsset]}>
          <Route exact path="/" component={Home} />
          <Route exact path="/game" component={Game} />
        </ThemeContext.Provider>
      </Routes>
    </div>
  );
}

export default App;
