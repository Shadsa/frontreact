import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import YearSelector from './YearSelector/YearSelector';
import Leaflet from './Leaflet/Leaflet';
import { authenticationService, isTokenExpired } from '../../Login/authenticationService';
import history from '../../history';

import './MapView.css';

let promise1 = null
let fetchDone = false
let dataFiltered;

class MapView extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            minYear: 2017,
            maxYear: 2017,
            lands: "",
            loading: true,
            landsFilter: null,
            atLeastOneNestLandsRoute : `${process.env.REACT_APP_API_HOST  }/lands/nests/atleastone`,
            allRoute : `${process.env.REACT_APP_API_HOST  }/lands?filter[offset]=0&filter[limit]=300000&filter[skip]=0`
        };
    }

    componentDidMount() {
      const tokenBearer = authenticationService.currentUserValue.token;
      if (isTokenExpired(tokenBearer)) {
          authenticationService.logout();
          history.push({
            pathname: '/',
            from: history.location.pathname,
          });
      }
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenBearer}`
            }
        };

        promise1 = new Promise((resolve) => {
            fetch(this.state.atLeastOneNestLandsRoute, requestOptions )
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    lands: data,
                    loading : false
                })
                resolve(data)
            }); 
            fetchDone = true;
        }) 
        promise1.then(() =>{
            this.handleFilterLandsByYear();
        });
    }

    handleYearChange = (tab) => {
        const min = tab[0]
        const max = tab[1]
        this.setState({
            minYear: min,
            maxYear: max
        });
    }
    
handleFilterLandsByYear = () => {
    const dataFilter = [];
    let isThere = false;
    const {lands} = this.state;
    for (let i = 0; i < lands.length; i++) {
        isThere = false;
        for (let y = 0; y < lands[i].properties.nests.length; y++) {
            if(lands[i].properties.nests[y].year <= this.state.maxYear && lands[i].properties.nests[y].year >= this.state.minYear) {
                isThere = true;
            }
        }
        if (isThere) {
            dataFilter.push(lands[i]);
        }
    }
    return dataFilter;
}

    render() {

        if (fetchDone) {
            dataFiltered = this.handleFilterLandsByYear();
        } else {
            dataFiltered = this.state.lands;
        }
        return (
          <div>
            {this.state.loading ? (
              <div id="loading-container">
                <img className="spinner" src={require('../../../src/mmw_icon.png')} alt="" />
              </div>
                ): (           
                  <Row className="row-no-margin">
                    <Col>
                      <div>
                        <div className="app-container">
                          <div className="yearContainer">
                            <YearSelector onHandleYearChange={this.handleYearChange} minYear={this.state.minYear} maxYear={this.state.maxYear} />
                          </div>
                          <div className="map-container">
                            <Leaflet lands={dataFiltered} minYear={this.state.minYear} maxYear={this.state.maxYear} />
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                )}
          </div>
        );
    }
}

export default MapView