import React, { Component } from 'react';
import { GeoJSON } from 'react-leaflet';

const data = require('../../../../data/regions.json');

class Regions extends Component {

    getGeoJson() {
        const content = data;
        let result = '';
        result = <GeoJSON data={content} style={this.getStyle} />;
        return result;
    }

    getStyle() {
        return {
          color: '#33FFFC',
          weight: 5,
          opacity: 0.4,
          fillOpacity: 0.1
        }
    }

    render() {
        return (
            this.getGeoJson()
        );
    }
}

export default Regions
