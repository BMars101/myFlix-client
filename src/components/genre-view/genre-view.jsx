import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './genre-view.scss';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {

    const { genre, movies } = this.props;

    return (
      <CardGroup>
        <Card style={{ width: '18rem' }} className="genre-view">
          <Card.Body>
            <Card.Header className="label-header">Movie Genre</Card.Header>
            <Card.Title className="label">Genre: </Card.Title>
            <Card.Text>{genre.Genre.Name}</Card.Text>
            <Card.Title className="label">Description: </Card.Title>
            <Card.Text>{genre.Genre.Description}</Card.Text>
          </Card.Body>
          <Link to={`/`}>
            <Button variant="dark" className="back-button">Back to Main Page</Button>
          </Link>
        </Card>
        <Card style={{ width: '18rem' }} className="movie-genre">
          <Card.Body>
            <Card.Title className="label-header">Movies in Same Genre: </Card.Title>
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

