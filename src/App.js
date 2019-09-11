import React from 'reactn';
import logo from './logo.svg';
import Datapoint from './components/datapoint/index.js';
import Plant from './components/plant/index.js';
import ReportsComponent from './components/reports/index.js';
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
      <div>
        <ReportsComponent/>
      </div>
    </div>
  );
}

export default App;
