import React, { useGlobal } from 'reactn';

import Button from '@material-ui/core/Button';
import Chart from 'components/Chart.js';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import Monthpicker from '@compeon/monthpicker';
import Paper from '@material-ui/core/Paper';
import SelectComponent from 'components/Select.js';

import { CONFIG } from '../../config.js';

const useStyles = makeStyles(theme => ({
  paperRoot:{
    padding: theme.spacing(3, 2),
    marginBottom: 20
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

export default function ReportsComponent(){
  const [plants] = useGlobal('plants');
  const initD = new Date().toISOString().substring(0,7);
  
  const [values,setValues] = React.useState({
    uid:'',
    name:''
  });
  const [flags,setFlag] = React.useState({
    uid:'',
    name:''
  });
  const [statDate,setStatDate] = React.useState(initD);
  const [stats,setStats] = React.useState();
  const classes = useStyles();
  const statChoices = [
    {
      'name': 'irradiation',
      'uid': 'irradiation'
    },
    {
      'name':'energy',
      'uid':'energy'
    }
  ];
  
  function handleChange(event){
    setValues({
      [event.target.name]: event.target.value,
    });
  }
  
  function handleStatChange(event){
    setFlag({
      [event.target.name]: event.target.value,
    });
  }

  function generateDataPoints(event){
    event.preventDefault();
    var searchParams = new URLSearchParams();
    searchParams.append('plant-id', values.name);
    searchParams.append('date', statDate);
    if(!values.name){
      alert('Select from plants')
    }
    else if(!statDate){
      alert('Select stat date')
    }
    else{
      //
      fetch(`${CONFIG.BACKEND_BASE_URL}/report/?${searchParams.toString()}`)
      .then(function(response){
        return response.json()
      })
      .then(
        function(data){
          //to do: how to manage global state vs continuously changing data from backend service
          setStats(data.data);
        }
      )
    }
  }
  return (
    <Container maxWidth="lg">
      <Paper className={classes.paperRoot}>
        <Grid container justify="flex-start" alignItems="center" direction="row">
          <Grid item xs={3}>
              <SelectComponent
                choices={plants}
                values={values}
                handleChange={handleChange}
                id={'plant-simple'}
                title={'Plant'}
              ></SelectComponent>
          </Grid>
          <Grid item xs={3}>
            <SelectComponent
              choices={statChoices}
              values={flags}
              handleChange={handleStatChange}
              id={'flag-simple'}
              title={'Stat'}
            ></SelectComponent>
          </Grid>
          <Grid item xs={3}>
            
            <Monthpicker
              format={'YYYY-MM'}
              onChange={data => setStatDate(data)}
            >
              <Input value={statDate}>Pick Month</Input>
            </Monthpicker>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={generateDataPoints} color="primary" className={classes.button}>
              Generate Report
            </Button>
          </Grid>
        </Grid>
        <Grid container justify="center" alignItems="center" direction="row">
          <Grid item xs={12}>
            { stats ? <Chart
                data={stats}
                flag={flags}
              /> : 'No data yet'}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}