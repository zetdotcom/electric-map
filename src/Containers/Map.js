import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { MdSearch, MdMyLocation } from "react-icons/lib/md";
import {ConnectorTypes} from '../Components/ConnectorTypes';
import "./Map.css";

export class Map extends React.Component {
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      },
      zoom: 6
    };

    this.loadMap = this.loadMap.bind(this);
    this.recenterMap = this.recenterMap.bind(this);
    this.myLocation = this.myLocation.bind(this);
  }

  myLocation() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords;
        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude
          },
          zoom: 12
        });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  recenterMap() {
    const map = this.map;
    const curr = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;
    if (map) {
      let center = new maps.LatLng(curr.lat, curr.lng);
      map.setZoom(this.state.zoom);
      map.panTo(center);
    }
  }

  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      //google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = {
        center: center,
        zoom: this.state.zoom
      };
      this.map = new maps.Map(node, mapConfig);

      this.map.addListener("click", evt => {
        this.props.onClick(this.map);
      });

      // initialize the autocomplete functionality using the #pac-input input box
      let inputNode = document.getElementById("pac-input");
      let boxNode = document.getElementById("pac-box");
      this.map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(
        boxNode
      );
      let autoComplete = new window.google.maps.places.Autocomplete(inputNode);

      //restric autocomplete suggestions to UK only
      autoComplete.setComponentRestrictions({ country: ["uk"] });

      autoComplete.addListener("place_changed", () => {
        let place = autoComplete.getPlace();
        let location;
        if (place.geometry) {
          location = place.geometry.location;
          this.map.setZoom(14);
        } else {
          inputNode.placeholder = "Enter a city";
        }

        // bring the selected place in view on the map
        // this.map.fitBounds(place.geometry.viewport);
        this.map.setCenter(location);
      });

      // trigger state change to draw markers on load
      this.setState({
        zoom: 14
      });
    }
  }

  renderChildren() {
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    });
  }

  render() {
    const style = {
      width: "100vw",
      height: "100vh"
    };

    return (
      <div>
        <div id="pac-box">
          <div className="autocomplete filter-box">
            <input
              id="pac-input"
              className="controls"
              type="text"
              placeholder="Enter Location"
              autoFocus
            />
            <MdSearch className="search-icon" />
          </div>
          <div className="filter-type filter-box">
            <ConnectorTypes onChange={this.props.typeSelection} />
          </div>
          <div className="geo-btn">
            <button onClick={this.myLocation}>
              <MdMyLocation />
            </button>
          </div>
        </div>

        <div style={style} ref="map">
          Loading ...
          {this.renderChildren()}
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  centerAroundCurrentLocation: PropTypes.bool,
  onClick: PropTypes.func
};

Map.defaultProps = {
  //center of UK by default
  initialCenter: {
    lat: 54.71907295005953,
    lng: -4.411053000000038
  },
  centerAroundCurrentLocation: true,
  onClick: function() {} // default prop
};