import React, {setGlobal} from 'reactn';
import PlantList from './plant-view.js';

class PlantComponent extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      "count": 0,
      "message":null
    }
  }
  validateForm(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    
    setGlobal({ plants: [...this.global.plants,form["plant"].value] });
  }
  handleChange(event) {
    if(event.target.value.length < 4){
      this.setState({"message":"too short!"});
    }
    else if(event.target.value.length > 12){
      this.setState({"message":"too long!"});
    }
    else {
      this.setState({"message":""});
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.validateForm}>
          <input
            type="text"
            name="plant"
            id="plant"
            onChange={this.handleChange.bind(this)}
            ref={this.textInput} />
          <button>Create plant</button>
            
          <b>{this.state.message}</b>
          <PlantList></PlantList>
        </form>
      </div>

    );
  }
}
export default PlantComponent;