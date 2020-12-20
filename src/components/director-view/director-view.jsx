import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Link } from 'react-router-dom';
import { MainView } from '../main-view/main-view';
import { MovieView } from '../movie-view/movie-view';

export class DirectorView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { director, movies } = this.props;

    return (
      <div className="director-view">
        <Card.Group>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className="label">Director </Card.Title>
              <Card.Text className="value">{director.Director.Name}</Card.Text>
              <Card.Text className="label">Bio: {director.Director.Bio} </Card.Text>
              <Card.Text className="label">Birthday: {director.Director.Birth}</Card.Text>
              <Card.Text className="label">Death: {director.Director.Death} </Card.Text>
              <Link to={`/`}>
                <Button variant="dark" className="back-button">Back</Button>
              </Link>
            </Card.Body>
          </Card>
          /*<Card className="director-movies">
            <Card.Body>
              <Card.Titles>Movies Directed:</Card.Titles>
              {movies.map(movie => {
                if (movie.Director.Name === director.Director.Name) {
                  return (<div key={movie._id}>
                    <Link to={`/movies/${movie_id}`}>
                      <Button variant="light" className="movie-button">{movie.Title}</Button>
                    </Link>
                  </div>)
                }
              }
              )}
            }
            </Card.Body>
          </Card>*/
        </Card.Group>


      </div >
    )
  }
};
