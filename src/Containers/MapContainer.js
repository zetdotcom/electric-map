import React from "react";
import {
  GoogleApiWrapper,
  Marker,
  InfoWindow
} from "google-maps-react";
import { MdDirections } from "react-icons/lib/md";
import { Map } from "./Map";

import * as pointsService from "../Services/PointService";

import "./MapContainer.css";

export class MapContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        type: "all"
      };

    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.typeSelection = this.typeSelection.bind(this);
  }

  onMarkerClick(markerProps, marker, e) {
    this.setState({
      selectedPlace: markerProps,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({ 
          showingInfoWindow: false,
          activeMarker: null
      });
    }
  }

  typeSelection(event) {
    let value = event.target.value;

    this.setState({
      type: value
    });
  }

  render() {
    if (!this.props.loaded) {
      return <div>Loading ...</div>;
    }

    const style = {
      width: "100vw",
      height: "100vh"
    };

    const markers = pointsService
      .filterByConnectorType(this.state.type)
      .map((location, index) => (
        <Marker
          onClick={this.onMarkerClick}
          key={location.ChargeDeviceId}
          name={location.ChargeDeviceName}
          position={{
            lat: location.ChargeDeviceLocation.Latitude,
            lng: location.ChargeDeviceLocation.Longitude
          }}
          buildingName={location.ChargeDeviceLocation.Address.BuildingName}
          buildingNumber={location.ChargeDeviceLocation.Address.BuildingNumber}
          thoroughfare={location.ChargeDeviceLocation.Address.Thoroughfare}
          postTown={location.ChargeDeviceLocation.Address.PostTown}
          county={location.ChargeDeviceLocation.Address.County}
          postCode={location.ChargeDeviceLocation.Address.PostCode}
          lat={location.ChargeDeviceLocation.Latitude}
          lng={location.ChargeDeviceLocation.Longitude}
          address={location.ChargeDeviceLocation.Address}
          access24={location.Accessible24Hours}
          payment={location.PaymentRequiredFlag}
          payDetails={location.PaymentDetails}
          website={location.DeviceOwner.Website}
          connector={location.Connector.map((type, index) => {
            return <p key={index}>{type.ConnectorType}</p>;
          })}
        />
      ));

      return (
        <div style={style}>
          <Map
            zoom={this.state.zoom}
            onClick={this.onMapClicked}
            google={this.props.google}
            typeSelection={this.typeSelection}
          >
            {markers}
  
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div className="iw">
                <div className="iw-device-name">
                  {this.state.selectedPlace.name}
                </div>
                <div className="iw-adress">
                  <span>
                    {this.state.selectedPlace.buildingNumber &&
                      this.state.selectedPlace.buildingNumber}
                    {this.state.selectedPlace.buildingName &&
                      this.state.selectedPlace.buildingName}
                    {this.state.selectedPlace.thoroughfare}
                    <br /> {this.state.selectedPlace.postTown}
                    <br /> {this.state.selectedPlace.postCode}
                    <br /> {this.state.selectedPlace.county}
                  </span>
                </div>
                <div className="iw-directions">
                  <a
                    href={
                      "https://www.google.co.uk/maps/dir/Current+Location/" +
                      this.state.selectedPlace.lat +
                      "," +
                      this.state.selectedPlace.lng
                    }
                    target="blank"
                  >
                    <MdDirections />
                    Get Directions 
                  </a>
                </div>
                <div className="other-details">
                  {this.state.selectedPlace.access24 ? <p>24hrs access</p> : ""}
                  {/* assummed that devices with PaymentRequiredFlag are free to use */}
                  {this.state.selectedPlace.payment
                    ? this.state.selectedPlace.payDetails !== "" &&
                      this.state.selectedPlace.payDetails !== null
                      ? `cost: ${this.state.selectedPlace.payDetails}`
                      : "FREE TO USE"
                    : "FREE TO USE"}
                  <br />
                  Connectors:
                  {this.state.selectedPlace.connector}
                </div>
              </div>
            </InfoWindow>
          </Map>
        </div>
      );
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: "AIzaSyB1d0hDpuBTzqNykkqMwgeJeXuOy4youM4",
    libraries: ["places"]
  })(MapContainer);