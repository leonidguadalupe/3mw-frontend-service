import React from 'reactn';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class PlantList extends React.Component {
  render(){
    return (
      <div>
        <Table>
          <TableHead>
            <tr>
              <TableCell>UID</TableCell>
              <TableCell>Plant name</TableCell>
              <TableCell>Settings</TableCell>
            </tr>
          </TableHead>
          <TableBody>
            {this.props.plants.map((plant,key)=>
              <TableRow key={key}>
                <TableCell>{plant.uid.substring(0,8)}</TableCell>
                <TableCell>{plant.name}</TableCell>
                <TableCell><button onClick={this.props.deleter} value={JSON.stringify(plant)}>Delete</button></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
  }
}
export default PlantList;