import React, { Component } from "react";
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import HeatmapLayer from './HeatmapLayer'

class Heatmap extends Component {

    render(){
        return(
            <HeatmapLayer
            fitBoundsOnLoad
            points={this.props.points}
            longitudeExtractor={m => m[1]}
            latitudeExtractor={m => m[0]}
            intensityExtractor={m => parseFloat(m[2])}
            />
        )
    }
}

export default Heatmap