import React from 'react';
import DataEnancer from './DataEnancer/DataEnancer';

import './Cluster.css';

class Cluster extends React.Component {    
    render() {
        return(
          <DataEnancer lands={this.props.lands} zoom={this.props.zoom} />
        );
    }
}

export default Cluster