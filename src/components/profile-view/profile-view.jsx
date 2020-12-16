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

      Username: username.anchor,
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
    const { movies } = this.props;

    const Username = this.state.Username;
    const Email = this.state.Email;
    const Birthday = this.state.Birthday;
    const FavoriteMovies = this.state.FavoriteMovies;

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