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
      FavoriteMovies: [],
    };
  }

  addToFavorites(movie) {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.post(`https://movie-api11.herokuapp.com/users/${username}/movies/${movie}`, {
      FavoriteMovies: this.FavoriteMovies
    },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then(response => {
        this.setState({
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    alert("movie added to movie list")
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    const handleSubmit = (e) => {
      e.preventDefault();

      axios.post(`https://movie-api11.herokuapp.com/users/${username}/movies/${movie.Title}`)
        .then(response => {
          console.log(response);
        })
    }

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
          <Button variant="dark" className="favorite-button" onClick={() => this.addToFavorites(movie._id)}>
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
  })
};