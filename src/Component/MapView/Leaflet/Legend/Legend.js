import React, {Component} from 'react';
import { Button, Collapse } from "reactstrap";
import Control from "react-leaflet-control";

import './Legend.css';

class Legend extends Component{

  constructor(props){
    super(props);
      this.state = {
          legend: {
            city: this.props.landGroup.city,
            agriculture: this.props.landGroup.agriculture,
            forest: this.props.landGroup.forest,
            water: this.props.landGroup.water
          },
      collapse : false,
    }
  }

  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  }

    render() {
      return(
        <Control position='bottomright' className="control-legend">
          <Button onClick={this.toggle} className="control-button">{this.state.collapse ? ">":"<"}</Button>
          <Collapse className='my-legend' isOpen={this.state.collapse}>
            <div className='legend-title'>{this.props.zoom >=11 ? ("Types de terrain") : ("Présence de nids")}</div>
            <div className='legend-scale'>
              <ul className='legend-labels'>
                {this.props.zoom >=11 ? (
                      // legend polygons
                  <div>
                    {this.props.landGroup.city && (
                      <li>
                        <span style={{background: '#455561'}} />
                        Ville (zone artificielle)
                      </li>
                )}
                    {this.props.landGroup.agriculture && (
                      <li>
                        <span style={{background: '#E8D84C'}} />
                        Zone agricole
                      </li>
                )}
                    {this.props.landGroup.forest && (
                      <li>
                        <span style={{background: '#648767'}} />
                        Forêt
                      </li>
                )}
                    {this.props.landGroup.water && (
                      <li>
                        <span style={{background: '#19647E'}} />
                        Eau
                      </li>
                )}
                  </div>
                  ) :(
                      // legend cluster
                    <div>
                      <li>
                        <span style={{background: '#6ecc39'}} />
                        Moins de 10 nids
                      </li>
                      <li>
                        <span style={{background: '#f0860c'}} />
                        Entre 10 et 100 nids
                      </li>
                      <li>
                        <span style={{background: '#f11717'}} />
                        Plus de 100 nids
                      </li>
                    </div>
                  )}

              </ul>
            </div>
          </Collapse>
        </Control>
        )
    }
  }

export default Legend
