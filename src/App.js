import React, { Component } from 'react';
import MapContainer from './Presentional/MapContainer';




import './App.css';

// import { getLocationById, getAccessible, filterByConnectorType } from './Services/PointService';


class App extends Component {


  render() {
// console.log(pointsService.getAccessible());
// console.log(pointsService.getLocationById('445c4cfca9b5ba22dae9baa00e20bde5'));
// console.log(pointsService.filterByConnectorType('Type 2 Mennekes (IEC62196)'))
    return (
      <div className="App">
        <MapContainer />
      </div>
    );
  }
}

export default App;
