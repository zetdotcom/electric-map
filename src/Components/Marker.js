import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Map} from '../Containers/Map';

const evtNames = ['click', 'mouseover'];

export class Marker extends React.Component {

    
    componentDidUpdate(prevProps) {
        if (this.props.map !== prevProps.map || this.props.position !== prevProps.position) {
            if (this.marker) {
            this.marker.setMap(null);
            }
            this.renderMarker();
            }
    }

    renderMarker() {
        let {
            map, google, position, mapCenter
        } = this.props;

        let pos = position || mapCenter;
        position = new google.maps.LatLng(pos.lat, pos.lng);

        const pref = {
            map: map,
            position: position 
        };
        this.marker = new google.maps.Marker(pref);
        evtNames.forEach(e => {
            this.marker.addListener(e, this.handleEvent(e));
          })

    }

    handleEvent(evtName) {
        // ...
    }

    render() {
        return null;
    }
}

Marker.propTypes = {
    position: PropTypes.object,
    map: PropTypes.object
}

