import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { MainView } from '../main-view/main-view';
import { MovieView } from '../movie-view/movie-view';

export class DirectorView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { director } = this.props;

    return (
      <div className="director-view">
        <div>
          <span className="label">Director: </span>
          <span className="value">{director.Director.Name}</span>
        </div>
        <div className="director-bio">
          <span className="label">Bio: </span>
          <span className="value">{director.Director.Bio}</span>
        </div>
        <div className="director-birthday">
          <span className="label">Birthday: </span>
          <span className="value">{director.Director.Birth}</span>
        </div>
        <div className="director-death">
          <span className="label">Death: </span>
          <span className="value">{director.Director.Death}</span>
        </div>
        <Link to={"/movie/:movieId"}>
          <Button className="back-button">Back</Button>
        </Link>
      </div>
    )
  }
};
