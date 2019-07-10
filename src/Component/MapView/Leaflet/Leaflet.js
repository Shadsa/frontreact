import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, LayersControl, FeatureGroup } from 'react-leaflet';
import PropTypes from 'prop-types';
import L from 'leaflet';
import Cluster from './Cluster/Cluster';
import './Leaflet.css';
import Legend from './Legend/Legend';
import Regions from './Regions/Regions';
import Heatmap from './Heatmap/Heatmap'


class Leaflet extends Component {
  propTypes = {
    minYear: PropTypes.number.isRequired,
    maxYear: PropTypes.number.isRequired,
    lands: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 5,
      zoomMax: 18,
      currentZoom: 5,
      center: [43.833, 2.583],
      minYear: this.props.minYear,
      maxYear: this.props.maxYear,
      landInViewport: null,
      legend: {
        city: false,
        agriculture: false,
        forest: false,
        water: false,
      },
      // previsionOn: true,
      mapChecked: false,
      heatmapChecked: true
    };
  }

  componentDidMount() {
    this.updateLandsInBounds();
  }

  getMapZoom() {
    const value = this.map && this.map.leafletElement.getZoom();
    this.setState(() => {
      return { currentZoom: value };
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.minYear !== state.minYear || props.maxYear !== state.maxYear) {
      return {
        minYear: props.minYear,
        maxYear: props.maxYear,
      };
    }
    return null;
  }

  getCoordinateFromLands() {
    
    var coordList = [];
    var addCoord = [];
    var nestList;
    let maxLat = 0;
    let minLat = 0;
    let maxLong = 0;
    let minLong = 0;
    var j;
    
    this.props.lands.forEach((land) => {
    maxLat = 0;
    minLat = 0;
    maxLong = 0;
    minLong = 0;
    j = 0;

      land.geometry.coordinates.forEach((coordinate) => {
        if (j === 0) {
          maxLat = coordinate.lat;
          minLat = coordinate.lat;
          maxLong = coordinate.lng;
          minLong = coordinate.lng;
        }
        if (coordinate.lat > maxLat)
            maxLat = coordinate.lat;

        if (coordinate.lat < minLat)
            minLat = coordinate.lat;

        if (coordinate.lng > maxLong)
            maxLong = coordinate.lng;

        if (coordinate.lng < minLong)
            minLong = coordinate.lng;

        j++
      });
      if (land.geometry.nests === null) {
        nestList = null;
      }else {
        nestList = land.properties.nests.length;
      }
      addCoord = [(maxLat + minLat)/2, (maxLong + minLong)/2, ""+nestList];
      coordList.push(addCoord);
    })
    return coordList;
  }

  heatmapStateHandle = () => {
    if (this.state.previsionOn) {
      this.setState( {
        previsionOn : false
      })
    } else {
      this.setState( {
        previsionOn : true
      })
    }
  }

  updateLandsInBounds = () => {
    if (this.map === null || this.state.currentZoom < 11) {
      return null;
    }
    let city = false;
    let agriculture = false;
    let forest = false;
    let water = false;

    this.props.lands.forEach(land => {
      for (let i = 0; i < land.geometry.coordinates.length; i++) {
        const point = land.geometry.coordinates[i];
        if (this.map.leafletElement.getBounds().contains(L.latLng(point.lat, point.lng))) {
          if (land.properties.family === 1 && !city) {
            city = true;
          } else if (land.properties.family === 2 && !agriculture) {
            agriculture = true;
          } else if (land.properties.family === 3 && !forest) {
            forest = true;
          } else if (land.properties.family === 4 && !water) {
            water = true;
          }
          break;
        }
      }
    });

    this.setState({
      legend: {
        city,
        agriculture,
        forest,
        water,
      },
    });
  };

  render() {
    var pointsList = this.getCoordinateFromLands();
    return (
      // <div className="container">
      //   <Map
      //       center={this.state.center}
      //       zoom={this.state.zoom}
      //       maxZoom={this.state.zoomMax}
      //       ref={ref => {
      //         this.map = ref;
      //       }}
      //       onClick={this.onClickHandler}
      //       onmoveend={this.updateLandsInBounds}
      //       onZoomEnd={this.getMapZoom.bind(this)}
      //   >
      //       <div>
      //           <LayersControl>
      //             <LayersControl.BaseLayer name="Base" checked >
      //               <TileLayer
      //                 url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      //                 attribution="&copy; <a href=http://osm.org/copyright>OpenStreetMap</a> contributors"
      //               />
      //           </LayersControl.BaseLayer>

      //           <LayersControl.Overlay name="Heatmap" checked={this.state.heatmapChecked} >
      //               <Heatmap points={pointsList} />
      //           </LayersControl.Overlay>
                
      //           <LayersControl.Overlay name="Map" checked={this.state.mapChecked}>
      //               <div>
      //               <Cluster
      //                 lands={this.props.lands}
      //                 minYear={this.state.minYear}
      //                 maxYear={this.state.maxYear}
      //                 zoom={this.state.currentZoom}
      //               />
      //               <Legend landGroup={this.state.legend} zoom={this.state.currentZoom} />
      //               <Regions />
      //               </div>
      //           </LayersControl.Overlay>
      //           </LayersControl>
      //       </div>
      //     )}
      //   </Map>
      //   <button onClick={this.heatmapStateHandle} >Heatmap</button>
      // </div>

      <div className="container">
        <Map
          center={this.state.center}
          zoom={this.state.zoom}
          maxZoom={this.state.zoomMax}
          ref={ref => {
            this.map = ref;
          }}
          onClick={this.onClickHandler}
          onmoveend={this.updateLandsInBounds}
          onZoomEnd={this.getMapZoom.bind(this)}
        >
          {this.state.previsionOn ? (
            <div>
              <LayersControl>
                <LayersControl.BaseLayer name="Base" checked >
                  <TileLayer
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=http://osm.org/copyright>OpenStreetMap</a> contributors"
                  />
                </LayersControl.BaseLayer>
                <LayersControl.Overlay name="Heatmap" checked >
                    <Heatmap points={pointsList} />
                </LayersControl.Overlay>
              </LayersControl>
            </div>
          ) : (
            <div>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url={this.state.url}
              />
              <Cluster
                lands={this.props.lands}
                minYear={this.state.minYear}
                maxYear={this.state.maxYear}
                zoom={this.state.currentZoom}
              />
              <Legend landGroup={this.state.legend} zoom={this.state.currentZoom} />
              <Regions />
            </div>
          )}
        </Map>
        <button onClick={this.heatmapStateHandle} >Heatmap</button> 
      </div>
    );
  }
}

export default Leaflet;
