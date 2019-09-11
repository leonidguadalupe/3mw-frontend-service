import React, {setGlobal} from 'reactn';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';

import { CONFIG } from '../../config.js';
import PlantList from './plant-view.js';

class PlantComponent extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.putPlantsToGlobal = this.putPlantsToGlobal.bind(this);
    this.deletePlant = this.deletePlant.bind(this);
    this.state = {
      "count": 0,
      "message": null,
      "inputFlag": true
    }
  }
  validateForm(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    
    var that = this;
    console.log('adding');
    console.log(CONFIG.BACKEND_BASE_URL);
    fetch(`${CONFIG.BACKEND_BASE_URL}/plants/`, {
        method: 'POST',
        body: data,
        mode: 'cors',
      })
      .then(function(response) {
          if (!response.ok) {
            if (response.status === 400){
              throw Error("Plant already exists");
            }
            throw Error("Bad request");
          }
          return response.json();
        }
      )
      .then(function(response) {
        setGlobal({ plants: [...that.global.plants, response]})
        alert("Successfully added plant")
      }).catch(function(error) {
        that.setState({ "message": error.message });
        return error
      });
      console.log('success');
  }

  handleChange(event) {
    if(event.target.value.length < 4){
      this.setState({
        "message": "too short!",
        "inputFlag": true
      });
    }
    else if(event.target.value.length > 20){
      this.setState({
        "message": "too long!",
        "inputFlag": true
      });
    }
    else {
      this.setState({
        "message": "",
        "inputFlag": false
      });
    }
  }
  
  deletePlant(event) {
    event.preventDefault();
    var plant = JSON.parse(event.currentTarget.value);
    var that = this;
    fetch(`${CONFIG.BACKEND_BASE_URL}/plants/${plant.uid}/`, {
        method: "delete",
      }
    ).then(function(response){
      if(response.ok){
        var plantslocal = that.global.plants;
        var removeIndex = plantslocal.map(function(plant) { return plant.uid; }).indexOf(plant.uid);
        plantslocal.splice(removeIndex, 1);
        setGlobal({plants: plantslocal});
      }
      else{
        throw Error('Something went wrong')
      }
    }).catch(
      function(error){
        alert(error)
      }
    );
  }
  
  putPlantsToGlobal() {
    console.log('putting')
    fetch(`${CONFIG.BACKEND_BASE_URL}/plants/`)
      .then(function(response){
        return response.json()
      })
      .then(
        function(data){
          setGlobal({plants: data});
        }
      )
  }

  componentDidMount(){
    this.putPlantsToGlobal()
  }

  render() {
    return (
      <Container maxWidth="lg">
        <Paper>
          <form onSubmit={this.validateForm}>
            <FormControl>
              <Input
                type="text"
                name="name"
                id="plant"
                onChange={this.handleChange.bind(this)}
                ref={this.textInput} />
            </FormControl> 
            <FormControl>
              <Button type="submit" variant="contained" color="primary" disabled={this.state.inputFlag}>Create plant</Button>
              <b>{this.state.message}</b>
            </FormControl>
            <PlantList plants={this.global.plants} deleter={this.deletePlant}></PlantList>
          </form>
        </Paper>
      </Container>
    );
  }
}
export default PlantComponent;