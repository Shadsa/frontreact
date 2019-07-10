/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Navbar, NavbarToggler, Nav, Collapse, NavItem } from 'reactstrap';
import { Router, Route, Link, Switch } from 'react-router-dom';
import { PrivateRoute, authenticationService } from './Login/index';
import history from './history';
import AuthView from './Component/AuthView/AuthView';
import Home from './Component/Home/Home';
import MapView from './Component/MapView/MapView';
import NoMatch from './NoMatch';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      collapsed: true,
    };

    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  logout() {
    authenticationService.logout();
    history.push('/');
  }

  render() {
    const { currentUser } = this.state;
    return (
      <Router history={history}>
        <Navbar bg="light" variant="light" expand="md" sticky="top">
          <a className="header" href="/">
            <img href="/" alt="logo" src={require('../src/mmw_icon.png')} height="50px" />
            <img href="/" alt="logo" src={require('../src/mmw_logo.png')} height="50px" />
          </a>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              {currentUser !== null ? (
                <div className="list-item-header">
                  <NavItem>
                    <Link to="/Home" className="nav-item nav-link">
                      Home
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-item nav-link" to="/MapView/">
                      MapView
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link to="" onClick={this.logout} className="nav-item nav-link">
                      Logout
                    </Link>
                  </NavItem>
                </div>
              ) : (
                <NavItem />
              )}
            </Nav>
          </Collapse>
        </Navbar>
        <Switch>
          <Route path="/" component={AuthView} exact />
          <PrivateRoute pathname='/Home' path='/Home/' component={Home} />
          <PrivateRoute pathname='/MapView' path='/MapView/' component={MapView} />
          <PrivateRoute render={() => <div>Not found</div>} component={NoMatch} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;
