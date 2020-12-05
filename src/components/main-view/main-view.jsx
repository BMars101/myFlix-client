import React from "react";
import axios from "axios";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


export class MainView extends React.Component {
  constructor() {
    //Call the superclass constructor so 
    //react can initialize it
    super();

    //Initialize the state to an empty object so we can destructure it later
    this.state = {
      movies: null,
      selectedMovie: null
    };
  }

  componentDidMount() {
    axios.get("https://movie-api11.herokuapp.com/movies").then(response => {
      this.setState({
        movies: response.data
      });
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  setInitialState() {
    this.setState({
      selectedMovie: null
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie}
            onClick={() => this.setInitialState()} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
          ))
        }
      </div>
    );
  }
}


