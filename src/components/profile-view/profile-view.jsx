import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


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


  render() {
    /*const { movies } = this.props;
  
    const Username = this.state.Username,
    const Email = this.state.Email,
    const Birthday = this.state.Birthday,
    const FavoriteMovies = this.state.FavoriteMovies;*/

    return (
      <div className="profile-view">
        <h1>User Profile</h1>
        <Link to={`/`}>
          <Button variant="outline dark" className="back-button">
            Back
          </Button>
        </Link>

      </div>
    )
  }
};