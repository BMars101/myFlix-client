import React from 'react';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {

    { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="genre-view">
        <div>
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre}</span>
        </div>
        <div className="genre-name">
          <span className="label">Name: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="genre-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Genre.Description}</span>
        </div>
      </div>
    )
  }
};


