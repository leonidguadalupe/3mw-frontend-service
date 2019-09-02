import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import React from 'reactn';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';

export default function DatapointDatePicker(props){
  const [selectedDate, setSelectedDate] = React.useState(props.initialDate);
  
  function handleDateChange(date) {
    setSelectedDate(date);
    if (typeof props.onChange === 'function'){
      props.onChange(date.toISOString().substring(0,10))
    }
  }
  return(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="yyyy-MM-dd"
        margin="normal"
        id="date-picker-inline"
        label={props.label}
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
        'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  )
}
