import React from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import './main-view.scss'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NavView } from '../nav-view/nav-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
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

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onRegister(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }


  render() {
    const { movies, user } = this.state;


    if (!movies) return <div className="main-view" />;

    return (
      <div>
        <NavView />
        <Router>
          <div className="main-view">
            <Route exact path="/"
              render={() => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />);
                return (
                  <CardColumns>
                    {movies.map(m =>
                      <MovieCard key={m._id} movie={m} />)}
                  </CardColumns>
                )
              }} />
            <Route
              exact path="/movies/:movieId"
              render={({ match }) =>
                <MovieView
                  movie={movies.find(m => m._id === match.params.movieId)}
                  user={user}
                />
              }
            />
            <Route
              exact path="/user"
              render={() =>
                <ProfileView
                  movies={movies}
                  user={user}
                />
              }
            />
            <Route
              exact path="/genres/:name"
              render={({ match }) => {
                if (!movies) return <div className="main-view" />;
                return (
                  <GenreView
                    genre={movies.find(m => m.Genre.Name === match.params.name)} movies={movies}
                  />
                );
              }} />
            <Route
              exact path="/directors/:name"
              render={({ match }) => {
                if (!movies) return <div className="main-view" />;
                return (
                  <DirectorView
                    director={movies.find(m => m.Director.Name === match.params.name)} movies={movies} />
                );
              }}
            />
            <Route path="/register"
              render={() =>
                <RegistrationView
                  onRegister={user =>
                    this.onRegister(user)} />}
            />
          </div>
        </Router>
      </div >
    );
  }
}

