import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ProfileView } from '../profile-view/profile-view';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import './nav-view.scss';

export class NavView extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  }

  render() {
    return (
      <Nav className='nav-view'>
        <h3>MyFlix</h3>

        <Button onClick={e => window.location.pathname = "/user"} variant="link" className="profile-button">
          User Profile
        </Button>
        <Button variant="link" className="logout-button"
                onClick={() => this.onLoggedOut()}>
          Logout
        </Button>
      </Nav>
    );
  }
}

export default Nav;