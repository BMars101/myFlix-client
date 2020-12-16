import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class ProfileView extends React.Component {
  constructor(props) {
    super();

    this.username = undefined;
    this.password = undefined;
    this.email = undefined;
    this.birthday = undefined;

    this.state = {
      user: null,
      username: '',
      password: '',
      email: '',
      birthday: '',
      favoriteMovies: [],
    };
  }

  componenetDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem("user");

    axios.get(`https://movie-api11.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleUpdate = (e) => {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.put(
      `https://movie-api11.herokuapp.com/users/${username}`, {
      Username: this.username,
      Password: this.password,
      Email: this.email,
      Birthday: this.birthday
    },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        const data = response.data;
        localStorage.setItem("user", data.Username);
        window.open("/users", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleDeregister = (e) => {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.delete(`https://movie-api11.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },

      Username: username,
    })
      .then(response => {
        const data = response.data;
        window.open("/", "_self");
      })
      .catch(function (error) {
        console.log(error)
      });

    this.setState({
      user: null,
    });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  /* removeItem(movie) {
     const username = localStorage.getItem("user");
     const token = localStorage.getItem("token");
   }*/

  setUsername(input) {
    this.username = input;
  }

  setPassword(input) {
    this.password = input;
  }

  setEmail(input) {
    this.email = input;
  }

  setBirthday(input) {
    this.birthday = input;
  }

  render() {
    const { user } = this.props;

    const Username = this.state.Username;
    const Email = this.state.Email;
    const Birthday = this.state.Birthday;
    const FavoriteMovies = this.state.FavoriteMovies;

    return (
      <div className="profile-view">
        <Container className="profile-container">
          <CardGroup>
            <Card>
              <Card.Header as="h3">User Profile</Card.Header>
              <Card.Body>
                <Card.Text className="card-text">
                  Username: {Username}
                </Card.Text>
                <Card.Text className="card-text">
                  Email: {Email}
                </Card.Text>
                <Card.Text className="card-text">
                  Birthday: {Birthday}
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="update-user-card">
              <Card.Header as="h3">Update User Profile</Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Label className="form-label">Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={this.username}
                    onChange={(e) => this.setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="form-label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={this.password}
                    onChange={(e) => this.setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="form-label">
                    Email Address
                    </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={this.email}
                    onChange={(e) => this.setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="form-label">
                    Birthday
                    </Form.Label>
                  <Form.Control
                    type="date"
                    name="birthday"
                    value={this.birthday}
                    onChange={(e) => this.setBirthday(e.target.value)} />
                </Form.Group>
                <Button variant="dark" className="update-button" onClick={() => this.handleUpdate()}>
                  Update
                  </Button>
              </Card.Body>

              <Link to={`/`}>
                <Button variant="dark" className="back-button">
                  Back
                </Button>
                <Button variant="outline dark" className="delete-button" onClick={() => this.handleDeregister()}>
                  Delete User
                </Button>
              </Link>
            </Card>
          </CardGroup>
        </Container>
      </div>
    )
  }
};