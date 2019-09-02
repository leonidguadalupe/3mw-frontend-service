import React from 'reactn';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
    margin: 8,
  }
}));

export default function SelectComponent(props){
  const classes = useStyles();
  
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={props.id}>{props.title}</InputLabel>
      <Select
        value={props.values.name}
        onChange={props.handleChange}
        inputProps={{
          name: 'name',
          id: props.id,
        }}
      >
        {props.choices.map((option,key) =>
          <MenuItem key={key} value={option.uid}>{option.name}</MenuItem>
        )}
      </Select>
    </FormControl>
  )
}
