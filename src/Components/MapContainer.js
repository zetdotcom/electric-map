import React, {Component} from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import {Map} from '../Containers/Map';

export class MapContainer extends React.Component {
    render() {
        if (!this.props.loaded) {
            return <div>Loading ... </div>
        }
            const style = {
                width: '100vw',
                height: '100vh',
                
              }
        
        return  (
            <div style={style}>
                <Map google={this.props.google} />
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyB1d0hDpuBTzqNykkqMwgeJeXuOy4youM4",
    libraries: ['places']
})(MapContainer)