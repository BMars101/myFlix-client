import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
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
      <CardGroup>
        <Card style={{ width: '18rem' }} className="genre-view">
          <Card.Body>
            <Card.Title>Movie Genre</Card.Title>
            <Card.Text>Genre: {genre.Genre.Name}</Card.Text>
            <Card.Text>Description: {genre.Genre.Description}</Card.Text>
          </Card.Body>
          <Link to={`/`}>
            <Button variant="outline dark" className="back-button">Back</Button>
          </Link>
        </Card>
        <Card style={{ width: '18rem' }} className="movie-genre">
          <Card.Body>
            <Card.Title>Movies in Same Genre</Card.Title>
            {movies.map(movie => {
              if (movie.Genre.Name === genre.Genre.Name) {
                return (<div key={movie._id}>
                  <Link to={`/movie/${movie._id}`}>
                    <Button variant="light" className="movie-button">{movie.Title}</Button>
                  </Link>
                </div>
                )
              }
            })}
          </Card.Body>
        </Card >
      </CardGroup >
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

