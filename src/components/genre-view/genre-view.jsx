import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { MainView } from '../main-view/main-view';
import { MovieView } from '../movie-view/movie-view';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {

    const { genre, movies } = this.props;

    //if (!movie) return null;

    return (
      <div className="genre-view">
        <div className="genre-name">
          <span className="label">Genre: </span>
          <span className="value">{genre.Genre.Name}</span>
        </div>
        <div className="genre-description">
          <span className="label">Description: </span>
          <span className="value">{genre.Genre.Description}</span>
        </div>
        <Link to={`/`}>
          <Button variant="outline dark" className="back-button">Back</Button>
        </Link>

      </div>
    )
  }
};


GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string,
  }),
  movies: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string
  })
};

