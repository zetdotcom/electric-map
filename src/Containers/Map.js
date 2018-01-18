import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export class Map extends React.Component {
    constructor(props) {
        super(props);

        const {lat, lng} = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            },
            zoom: 12
        }


        this.recenterMap = this.recenterMap.bind(this)
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
            let center = new maps.LatLng(curr.lat, curr.lng)
            map.panTo(center)
            
        }
      }

    componentDidMount() {
        if (!this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    const coords = pos.coords;
                    
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude,
                            
                        },
                        zoom: 2
                    })
                })
            }
        }

        this.loadMap();
    }

    loadMap() {
        if (this.props && this.props.google) {
            //google is available
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let {initialCenter, zoom} = this.props;
            const {lat, lng} = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = {
                center: center,
                zoom: this.state.zoom,
                };
            this.map = new maps.Map(node, mapConfig);

            this.map.addListener('click', (evt) => {
                this.props.onClick(this.map);
            })
            
        }
    }

    renderChildren() {
        const {children} = this.props;

        if (!children) return;

        return React.Children.map(children, c => {
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        })
    }


    render() {

        const style = {
            width: '100vw',
            height: '100vh',
            
          }

        return(
            <div style={style} ref='map'>
                Loading ...
                {this.renderChildren()}
            </div>
        )
    }
}

Map.propTypes = {
    google: PropTypes.object,
    zoom:  PropTypes.number,
    initialCenter:  PropTypes.object   ,
    centerAroundCurrentLocation: PropTypes.bool,
    onClick: PropTypes.func
}

Map.defaultProps ={
    zoom: 6,
    //center of UK by default
    initialCenter: {
        lat: 52.621388,
        lng: -2.592773
    },
    centerAroundCurrentLocation: false,
    onClick: function() {} // default prop
}