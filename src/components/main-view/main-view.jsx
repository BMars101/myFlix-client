import React from "react";
import axios from "axios";
import { MovieCard } from '../movie-card/movie-card';


export class MainView extends React.Component {
  constructor() {
    //Call the superclass constructor so 
    //react can initialize it
    super();

    //Initialize the state to an empty object so we can destructure it later
    this.state = {};
    //access later with const { /something /} = this.state;
  }

  //This overrides the render() method of the superclass 
  render() {
    return (
      <div className="main-view"></div>
    );
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

  render() {
    const { movies } = this.state;

    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        { movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    );
  }
}

