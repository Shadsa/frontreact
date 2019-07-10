/* eslint-disable react/jsx-indent */
import React from 'react';
import { Polygon, Popup, Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';

import '../Cluster.css';
import './DataEnancer.css';

// Display nests number instead of polygons number
function createClusterCustomIcon(cluster) {
    const children = cluster.getAllChildMarkers();
    let nests = 0;

    children.forEach((child) => {
        nests += child.options.nests
    });

    let c = ' marker-cluster-';
    if (nests < 10) {
        c += 'small';
    } else if (nests < 100) {
        c += 'medium';
    } else {
        c += 'large';
    }

    return new L.DivIcon({
        html: `<div><span>${  nests  }</span></div>`,
        className: `marker-cluster${  c}`,
        iconSize: new L.Point(40, 40)
    });
}

// Define color of polygon following family type
function defineColor(family) {
    let color = '';

    (family === 1) ? (color = '#455561') : ((family === 2) ? (color = '#E8D84C') :
    (family === 3) ? (color = '#648767') : (family === 4) ? (color = '#19647E') : (color = 'red'));

    return color;
}

function CreateAllPolygons(props) {
    const polygons = [];
    const polygonsByRegion = [];
    let i = 0;
    // Show/Hide Polygons following zoom level
    let isHidden = false;
    (props.zoom >= 11) ? (isHidden = false) : (isHidden = true);

    props.lands.forEach((eachPolygon) => {
        let maxLat = -10000;
        let minLat = 10000;
        let maxLong = -10000;
        let minLong = 10000;
        let j = 0;

        eachPolygon.geometry.coordinates.forEach((eachCoordinates) => {
            if (j === 0)
                polygons[i] = [[eachCoordinates.lat, eachCoordinates.lng]];

            else
                polygons[i].push([eachCoordinates.lat, eachCoordinates.lng]);

            if (eachCoordinates.lat > maxLat)
                maxLat = eachCoordinates.lat;

            if (eachCoordinates.lat < minLat)
                minLat = eachCoordinates.lat;

            if (eachCoordinates.lng > maxLong)
                maxLong = eachCoordinates.lng;

            if (eachCoordinates.lng < minLong)
                minLong = eachCoordinates.lng;

            j++;
        });

        // If isHidden true only return transparent center markers of polygons else return markers and polygons
        polygons[i] =
            isHidden ? 
              <Marker position={[minLat + ((maxLat - minLat) / 2), minLong + ((maxLong - minLong) / 2)]} opacity={0} key={i} nests={eachPolygon.properties.nests.length} />
              :
              (
              <Polygon color={defineColor(eachPolygon.properties.family)} positions={polygons[i]} key={i}>
                <Popup>
                        {` Nests: ${  eachPolygon.properties.nests.length}`}
                        {` Department: ${  eachPolygon.properties.dep}`}
                </Popup>
                    <Marker position={[minLat + ((maxLat - minLat) / 2), minLong + ((maxLong - minLong) / 2)]} opacity={0} key={i} nests={eachPolygon.properties.nests.length} />
              </Polygon>
              )
        
        if(eachPolygon.properties.region.code !== 0){
            (polygonsByRegion[eachPolygon.properties.region.code] === undefined) ?
                (polygonsByRegion[eachPolygon.properties.region.code] = [polygons[i]]) :
                (polygonsByRegion[eachPolygon.properties.region.code].push(polygons[i]));
        }
        i++;
    });
    return polygonsByRegion;
}

function CreateAllCluster(props) {
    const polygons = CreateAllPolygons(props);
    const result = [];
    let i = 0;

    polygons.forEach((clusters) => {
        result.push(
          <MarkerClusterGroup maxClusterRadius={200} key={i} disableClusteringAtZoom={11} iconCreateFunction={createClusterCustomIcon}>
          {clusters}
          </MarkerClusterGroup>);
        i++;
    });

    return result;
}

class DataEnancer extends React.Component {
    render() {
        return(
            CreateAllCluster(this.props)
        );
    }
}

export default DataEnancer
