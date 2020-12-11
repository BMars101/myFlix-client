import React from "react";
import axios from "axios";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss'

export class MainView extends React.Component {
  constructor() {
    //Call the superclass constructor so 
    //react can initialize it
    super();

    //Initialize the state to an empty object so we can destructure it later
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null
    };
  }

  /*componentDidMount() {
    axios.get("https://movie-api11.herokuapp.com/movies").then(response => {
      this.setState({
        movies: response.data
      });
    })
      .catch(function (error) {
        console.log(error);
      });
  }*/

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

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://movie-api11.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    //if (!user) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        <header className="main-view_header">Welcome to myFlix</header>
        <Container className="main-view_container">
          <Row>
            <Col className="main-view_col">
              {selectedMovie
                ? <MovieView movie={selectedMovie}
                  onClick={() => this.setInitialState()} />
                : movies.map(movie => (
                  <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                ))
              }
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

