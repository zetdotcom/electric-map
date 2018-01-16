import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as pointsService from '../Services/PointService';
import {GetLocation, latCoords, lngCoords} from '../Containers/Geolocation';


 
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      lat: 55,
      lng: -4
    }
    
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

onBtnClick(props) {
  console.log(props)
  this.setState = {
    lat: this.props.latCoords,
    lng: this.props.lngCoords
  }
}
  
  onMarkerClick(markerProps, marker, e) {
    GetLocation()
    console.log(markerProps, marker)
    this.setState({
      selectedPlace: markerProps,
      activeMarker: marker,
      showingInfoWindow: true,
      
    });
  }

  onMapClicked (props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

render() {

    const markers = pointsService.getAccessible().map((location, index) => (
      <Marker onClick={this.onMarkerClick} key={location.ChargeDeviceId}  name={location.ChargeDeviceName}
        position={{lat: location.ChargeDeviceLocation.Latitude, lng: location.ChargeDeviceLocation.Longitude}}
        address={location.ChargeDeviceLocation.Address}
      />
    ));

    return (
      <Map onClick={this.onMapClicked} google={this.props.google} zoom={6} initialCenter={{ lat: this.state.lat, lng: this.state.lng }}  style={{ height: '400px', width: '69%'}} >
        
        {markers}
 
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
              <div>{JSON.stringify(this.state.selectedPlace.address)}</div>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyB1d0hDpuBTzqNykkqMwgeJeXuOy4youM4")
})(MapContainer)
