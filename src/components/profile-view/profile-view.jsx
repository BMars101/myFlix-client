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
  }

  handleUpdate = (e) => {
    
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    e.preventDefault();

    const newUsername = e.target[0].value;
    const newPassword = e.target[1].value;
    const newEmail = e.target[2].value;
    const newBirthdate = e.target[3].value;

    return axios(
      {
        method: "put",
        url: `https://movie-api11.herokuapp.com/users/${username}`,
        data: {
          Username: newUsername,
          Password: newPassword,
          Email: newEmail,
          Birthday: newBirthdate
        },
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then((response) => {
        console.log(response);
        const data = response.data;
        console.log(data);
        localStorage.setItem("user", data.Username);
        return data;  
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

  removeMovie(movieID) {
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

  render() {

    const { movies, user, handleFavoriteMovie } = this.props;

    if (!user) return <div>Loading...</div>

    const FavoriteMovies = user.FavoriteMovies;
    

    return (
      <div className="profile-view">
        <Container className="profile-container">
          <CardGroup>
            <Card className="update-user-card">
              <Card.Header as="h3">Update User Profile {user.Username}</Card.Header>
              <Card.Body>
                <Form onSubmit={(e) => this.handleUpdate(e).then((user) => handleFavoriteMovie(user))}>
                  <Form.Group>
                    <Form.Label className="form-label">Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      defaultValue={user.Username}
                      />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="form-label">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      defaultValue={''}                  
                      />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="form-label">
                      Email Address
                      </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      defaultValue={user.Email} 
                      />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="form-label">
                      Birthday
                      </Form.Label>
                    <Form.Control
                      type="date"
                      name="birthday"
                      defaultValue={user.Birthday}
                      />
                  </Form.Group>
                  <Button type="submit" variant="dark" className="update-button">
                    Update
                    </Button>
                  <Button variant="danger" className="delete-button" onClick={() => this.handleDeregister()}>
                    Delete User
                  </Button>
                </Form>
                </Card.Body>
                <Link to={`/`}>
                  <Button variant="dark" className="back-button">
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
                            variant="dark"
                            className="remove-btn"
                            onClick={() => this.removeMovie(movie._id).then((user) => handleFavoriteMovie(user))}>
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