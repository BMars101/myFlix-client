import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {
      FavoriteMovies: []
    };
    console.log(this.state);
  }

  handleSubmit = (username, movieID) => {
  
    const token = localStorage.getItem("token");

     return axios(
      {
        method: "post",
        url: `https://movie-api11.herokuapp.com/users/${username}/movies/${movieID}`,
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then(response => {
        alert('Movie added to list');
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };



  render() {
    const { movie, user, handleFavoriteMovie } = this.props;

    if (!movie) return null;


    return (
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-title">
          <span className="label"><strong>Title: </strong></span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-text">
          <span className="label"><strong>Description: </strong></span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-text">
          <span className="label"><strong>Genre: </strong> </span>
          <span className="value">{movie.Genre.Name}</span>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
        </div>
        <div className="movie-text">
          <span className="label"><strong>Director: </strong>: </span>
          <span className="value">{movie.Director.Name}</span>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
        </div>
        <div>
          <Button variant="dark" className="favorite-button" onClick=
            {(e) => this.handleSubmit(user.Username, movie._id).then((user) => handleFavoriteMovie(user))}>
            Add to Favorites
          </Button>
        </div>
        <br />
        <div>
          <Link to={'/'}>
            <Button variant="dark" className="back-button">Back</Button>
          </Link>
        </div>
      </div >

    );
  }

}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }),
  user: PropTypes.shape({
    username: PropTypes.string,

  })
};