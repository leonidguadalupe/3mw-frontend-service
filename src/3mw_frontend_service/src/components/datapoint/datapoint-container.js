import React, {setGlobal} from 'reactn';
//import PlantList from './plant-view.js';

class DatapointComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  validateForm(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    //post request backend to save
    setGlobal({ plants: [...this.global.plants,form["plant"].value] });
  }

  render() {
    return (
      <div>
        <h3>Datapoints</h3>
        <label>
          Select plant:
          <select>
            {this.global.plants.map((name) =>
              <option value={name.toLowerCase()}>{name}</option>
            )}
          </select>
        </label>
      </div>
    );
  }
}
export default DatapointComponent;