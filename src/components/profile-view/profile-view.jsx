import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructorprops');

    this.state = {
      Username: '',
      Password: '',
      Email: '',
      Birthday: '',
      FavoriteMovies: [],
      validated: '',
      user: null
    };
  }


  // componentDidMount() {
  //   console.log('here');
  //   const accessToken = localStorage.getItem("token");
  //   this.getUser(accessToken);
  // }



  handleUpdate = (e) => {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.put(
      `https://movie-api11.herokuapp.com/users/${username}`, {
      Username: this.Username,
      Password: this.Password,
      Email: this.Email,
      Birthday: this.Birthday
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
        alert('User has been deleted')
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

  removeItem(movieID) {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    return axios.delete(`https://movie-api11.herokuapp.com/users/${username}/movies/${movieID}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then(response => {
        return response.data
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  render() {

    const { movies, user, handleFavoriteMovie } = this.props;

    // const Username = this.state.Username;
    // const Email = this.state.Email;
    // const Birthday = this.state.Birthday;
    const FavoriteMovies = user.FavoriteMovies;
    console.log(movies);

    return (
      <div className="profile-view">
        <Container className="profile-container">
          <CardGroup>
            <Card className="update-user-card">
              <Card.Header as="h3">Update User Profile</Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Label className="form-label">Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={user.Username}
                    onChange={(e) => this.setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="form-label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={''}
                    onChange={(e) => this.setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="form-label">
                    Email Address
                    </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={user.Email}
                    onChange={(e) => this.setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="form-label">
                    Birthday
                    </Form.Label>
                  <Form.Control
                    type="date"
                    name="birthday"
                    value={user.Birthday}
                    onChange={(e) => this.setBirthday(e.target.value)} />
                </Form.Group>
                <Button variant="dark" className="update-button" onClick={() => this.handleUpdate()}>
                  Update
                  </Button>
                <Button variant="danger" className="delete-button" onClick={() => this.handleDeregister()}>
                  Delete User
                </Button>
              </Card.Body>
              <Link to={`/`}>
                <Button variant="dark" style={{ margin: "15px" }} className="back-button">
                  Back
                </Button>
              </Link>
            </Card>
            <Card className="favorites-list">
              <Card.Header as="h3">Favorite Movie List</Card.Header>
              <Card.Body>
                {FavoriteMovies.length === 0 && <div>Add Favorites</div>}
                <div>
                  <ul>
                    {FavoriteMovies.length > 0 && FavoriteMovies.map((movieID) => {
                      const movie = movies.find(movie => movie._id === movieID);
                      return (
                        <li key={movie._id} className="favorite-item" >
                          {movie.Title}
                          <Button
                            variant="outline-dark"
                            className="remove-item"
                            onClick={() => this.removeItem(movie._id).then((user) => handleFavoriteMovie(user))}>
                            Remove Movie
                        </Button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </CardGroup>
        </Container >
      </div >
    )
  }
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array,
  }),
  movie: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string,
      _id: PropTypes.number
    })
  )
};