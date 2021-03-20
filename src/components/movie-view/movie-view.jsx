import React from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {
      FavoriteMovies: []
    };
    console.log(this.state);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let movieItem = JSON.parse(localStorage.getItem('FavoriteMovies')) || [];
    if (movieItem.includes(movie._id)) {
      alert('Movie already added to list');
      return;
    }

    const token = localStorage.getItem("token");

    axios(
      {
        method: "post",
        url: `https://movie-api11.herokuapp.com/users/${username}/movies/${movie._id}`,
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then(response => {
        console.log(response);
        movieItem.push(movie._id);
        localStorage.setItem(
          'FavoriteMovies',
          JSON.stringify(movieItem)
        );
        alert('Movie added to list');
      })
      .catch(function (error) {
        console.log(error);
      });
  };



  render() {
    const { movie, user: username } = this.props;

    if (!movie) return null;


    return (
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
        </div>
        <div>
          <Button variant="dark" className="favorite-button" onClick=
            {(e) => this.handleSubmit(e, movie._id)}>
            Add to Favorites
          </Button>
        </div>
        <br />
        <div>
          <Link to={'/'}>
            <Button variant="outline-dark" className="back-button">Back</Button>
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