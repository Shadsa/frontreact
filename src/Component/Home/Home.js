import React from 'react'
import { authenticationService } from '../../Login/index';
import './Home.css'

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
        };
    }

    render() {
        return (
          <h1> Welcome on MapMyWorld ! </h1>
        )  
    }
}
 export default Home;