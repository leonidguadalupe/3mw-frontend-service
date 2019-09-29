import React from 'reactn';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function TableComponent(props){
  return (
    <div>
      <Table>
        <TableHead>
          <tr>
            {props.headers.map((header,key) =>
              <TableCell key={key}>{header}</TableCell>
            )}
          </tr>
        </TableHead>
        <TableBody>
          {props.plants.map((plant,key) =>
            <TableRow key={key}>
              <TableCell>{plant.uid.substring(0,8)}</TableCell>
              <TableCell>{plant.name}</TableCell>
              <TableCell><button onClick={props.handle} value={JSON.stringify(plant)}>Delete</button></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
