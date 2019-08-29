import React from 'reactn';
import logo from './logo.svg';
import Plant from './components/plant/index.js';
import Datapoint from './components/datapoint/index.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Leonid solar ventures
        </p>
      </header>
      <div>
        <Plant/>
      </div>
      <div>
        <Datapoint/>
      </div>
    </div>
  );
}

export default App;
