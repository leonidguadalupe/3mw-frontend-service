import React from 'reactn';
import logo from './logo.svg';
import DatapointComponent from './views/datapoint/index.js';
import PlantComponent from './views/plant/index.js';
import ReportsComponent from './views/reports/index.js';
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
        <PlantComponent/>
      </div>
      <div>
        <DatapointComponent/>
      </div>
      <div>
        <ReportsComponent/>
      </div>
    </div>
  );
}

export default App;
