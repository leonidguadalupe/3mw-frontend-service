import React, {getGlobal} from 'reactn';

function PlantList(props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>UID</td>
            <td>Plant name</td>
          </tr>
        </thead>
        <tbody>
          {getGlobal().plants.map((plantname,key)=>
            <tr key={key}>
              <td>adlkas;d</td>
              <td>{plantname}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default PlantList;