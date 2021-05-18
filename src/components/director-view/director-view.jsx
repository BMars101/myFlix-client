import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { director, movies } = this.props;

    return (
      <CardGroup>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Header className="label">
              Director
            </Card.Header>
            <Card.Title className="value">
              Name:
              </Card.Title>
            <Card.Text className="value">
              {director.Director.Name}
            </Card.Text>
            <Card.Title className="label">
              Bio:
              </Card.Title>
            <Card.Text className="label">
              {director.Director.Bio}
            </Card.Text>
            <Card.Title className="label">
              Birthday:
              </Card.Title>
            <Card.Text className="label">
              {director.Director.Birth}
            </Card.Text>
            <Card.Title className="label">
              Death:
            </Card.Title>
            <Card.Text className="label">
              {director.Director.Death}
            </Card.Text>
            <Link to={`/`}>
              <Button variant="dark" className="back-button">Back to Main Page</Button>
            </Link>
          </Card.Body>
        </Card>
        <Card className="director-movies">
          <Card.Body>
            <Card.Title>Movies Directed:</Card.Title>
            {movies.map(movie => {
              if (movie.Director.Name === director.Director.Name) {
                return (<div key={movie._id}>
                  <Link to={`/movie/${movie._id}`}>
                    <Button variant="light" className="movie-button">{movie.Title}</Button>
                  </Link>
                </div>)
              }
            }
            )}
          </Card.Body>
        </Card>
      </CardGroup >
    )
  }
};

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    Birth: PropTypes.string,
    Death: PropTypes.string,
  }),
  movies: PropTypes.shape({
    Title: PropTypes.string,
  })
}
