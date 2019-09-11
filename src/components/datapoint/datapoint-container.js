import React, {useGlobal} from 'reactn';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import { CONFIG } from '../../config.js';
import DatapointDatePicker from './datapoint-view.js';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paperRoot:{
    padding: theme.spacing(3, 2),
    marginBottom: 20,
    marginTop: 20
  },
  headingPad:{
    padding: theme.spacing(2, 2),
  },
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function DatapointComponent() {
  const initD = new Date().toISOString().substring(0,10);
  const [plants] = useGlobal('plants');
  const [fromDate,setFromDate] = React.useState(initD);
  const [toDate,setToDate] = React.useState(initD);
  const [values,setValues] = React.useState({
    uid:'',
    name:''
  });
  const classes = useStyles();

  function datePickFromHandler(event){
    setFromDate(event)
  }

  function datePickToHandler(event){
    setToDate(event)
  }

  function generateDataPoints(event){
    var searchParams = new URLSearchParams();
    searchParams.append('plant-id', values.name);
    searchParams.append('from', fromDate)
    searchParams.append('to', toDate)
    if(!values.name){
      alert('Pick a plant')
    }
    else{
      fetch(`${CONFIG.BACKEND_BASE_URL}/monitoring/?${searchParams.toString()}`)
        .then(function(response){
          return response.json()
        })
        .then(
          function(data){
            console.log(data);
            //setGlobal({plants: data});
          }
        )
    }
  }
  
  function handleChange(event){
    setValues({
      [event.target.name]: event.target.value,
    });
  }

  return (
    <Container maxWidth="lg">
      <Paper className={classes.paperRoot}>
        <Grid container justify="flex-start" direction="row">
          <Typography variant="h5" className={classes.headingPad}>
            Datapoints
          </Typography>
        </Grid>
        <Grid container justify="flex-start" direction="row">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="plant-simple">Plant</InputLabel>
            <Select
              value={values.name}
              onChange={handleChange}
              inputProps={{
                name: 'name',
                id: 'plant-simple',
              }}
            >
              {plants.map((plant,key) =>
                <MenuItem key={key} value={plant.uid}>{plant.name}</MenuItem>
              )}
            </Select>
          </FormControl>
          
        </Grid>
        <Grid container justify="flex-start" direction="row">
          <Grid item xs={3}>
            <DatapointDatePicker initialDate={fromDate} onChange={datePickFromHandler} label="From"/>
          </Grid> 
          <Grid item xs={3}>
            <DatapointDatePicker initialDate={toDate} onChange={datePickToHandler} label="To"/>
          </Grid>
        </Grid>
        <Grid container justify="flex-start" direction="row">
          <Grid item xs={3}>
            <Button variant="contained" onClick={generateDataPoints} color="primary" className={classes.button}>
              Generate Datapoints
            </Button>
          </Grid>
        </Grid>
        
      </Paper>
    </Container>
  )
}
