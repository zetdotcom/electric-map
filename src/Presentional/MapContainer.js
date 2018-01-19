import React, {Component} from 'react';
import {GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import {Map} from '../Containers/Map';

import * as pointsService from '../Services/PointService';

import './MapContainer.css';

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        }

        // binding this to event-handler functions
        this.onMarkerClick = this
            .onMarkerClick
            .bind(this);
        this.onMapClicked = this
            .onMapClicked
            .bind(this);

    }

    onMarkerClick(markerProps, marker, e) {
        this.setState({
            selectedPlace: markerProps,
            activeMarker: marker,
            showingInfoWindow: true});
    }

    onMapClicked(props) {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null})
        }
    }



    render() {
        if (!this.props.loaded) {
            return <div>Loading ...
            </div>
        }

        const style = {
            width: '100vw',
            height: '100vh'
        }


        const info = (place) => {

            if ( this.state.selectedPlace.place !== "" || this.state.selectedPlace.place !== null) {
                return this.state.selectedPlace.place
            }
        }
        

        const markers = pointsService
            .getAccessible()
            .map((location, index) => (<Marker
                onClick={this.onMarkerClick}
                key={location.ChargeDeviceId}
                name={location.ChargeDeviceName}
                position={{
                lat: location.ChargeDeviceLocation.Latitude,
                lng: location.ChargeDeviceLocation.Longitude
            }}
                buildingName={location.ChargeDeviceLocation.Address.BuildingName}
                buildingNumber={location.ChargeDeviceLocation.Address.BuildingNumber}
                throughfare={location.ChargeDeviceLocation.Address.Throughfare}
                postTown={location.ChargeDeviceLocation.Address.PostTown}
                county={location.ChargeDeviceLocation.Address.County}
                postCode={location.ChargeDeviceLocation.Address.PostCode}
                lat={location.ChargeDeviceLocation.Latitude}
                lng={location.ChargeDeviceLocation.Longitude}
                address={location.ChargeDeviceLocation.Address}
                />));



        return (
            <div style={style}>
                
                <Map onClick={this.onMapClicked} google={this.props.google} >
                    {markers}

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>

                        <div className="iw">
                            <div className="iw-device-name">{this.state.selectedPlace.name}</div>
                            <div className="iw-adress"><span>
                                {this.state.selectedPlace.buildingNumber && this.state.selectedPlace.buildingNumber} {this.state.selectedPlace.buildingName && this.state.selectedPlace.buildingName}  
                                {this.state.selectedPlace.troughfare}<br />
                                {this.state.selectedPlace.postTown}<br />
                                {this.state.selectedPlace.postCode}<br />
                                {this.state.selectedPlace.county}
                                </span>
                            </div>
                            <div className="iw-directions">
                                <a href={'https://www.google.co.uk/maps/dir/Current+Location/' + this.state.selectedPlace.lat + ','+ this.state.selectedPlace.lng} target="blank">directions</a>
                            </div>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({apiKey: "AIzaSyB1d0hDpuBTzqNykkqMwgeJeXuOy4youM4", libraries: ['places']})(MapContainer)