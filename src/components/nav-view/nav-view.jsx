import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import './nav-view.scss';

export class NavView extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  render() {
    return (
      <Router>
        <Nav className='nav-view'>
          <h3>MyFlix</h3>
          <div className='nav-links'>
            <Link to={`/users`}>
              <Button variant="link" className="profile-button">
                User Profile
            </Button>
            </Link>
            <Link to='/logout'>
              <Button className="logout-button"
                onClick={() => this.onLoggedOut()}>
                Logout
        </Button>
            </Link>
          </div>
        </Nav>
      </Router>
    );
  }
}

export default Nav;