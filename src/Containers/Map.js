import React, {Component} from 'react'
import ReactDOM from 'react-dom';

export class Map extends React.Component {

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
    }

    componentDidMount() {
        this.loadMap();
    }

    loadMap() {
        if (this.props && this.props.google) {
            //google is available
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let zoom = 8;
            let lat= 55;
            let lng= -4;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = {
                center: center,
                zoom: zoom,
                };
            this.map = new maps.Map(node, mapConfig);
        }
    }


    render() {

        const style = {
            width: '100vw',
            height: '100vh',
            
          }

        return(
            <div style={style} ref='map'>
                Loading ...
            </div>
        )
    }
}