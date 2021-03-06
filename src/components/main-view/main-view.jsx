import React from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { setMovies, setUser } from '../../actions/actions';
import PropTypes from 'prop-types';
import CardColumns from 'react-bootstrap/CardColumns';
import MoviesList from '../movie-list/movie-list';
import ProfileView from '../profile-view/profile-view';
import RegistrationView from '../registration-view/registration-view';
import { NavView } from '../nav-view/nav-view';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import './main-view.scss';


class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      const username = localStorage.getItem('user');
      this.setState({
        isLoggedIn: true
      })
      this.getUser(username, accessToken);
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://movie-api11.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUser(username, token) {
    axios.get(`https://movie-api11.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.props.setUser(authData.user);
    this.getMovies(authData.token);
  }

  onRegister(authData) {
    console.log(authData);
    this.props.setUser(authData.user);
    // this.setState({
    //   user: authData.user
    // });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }


  render() {
    const { user, movies } = this.props;
    const { isLoggedIn } = this.state;


    if(isLoggedIn && (!user || movies.length === 0)) return <div>Loading...</div> 
    
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
                    <MoviesList movies={movies}/>
                  </CardColumns>
                )
              }} />
            <Route
              exact path="/movies/:movieId"
              render={({ match }) =>
                <MovieView
                  movie={movies.find(m => m._id === match.params.movieId)}
                  user={user}
                  handleFavoriteMovie={(user) => {this.props.setUser(user)}}
                />
              }
            />
            <Route
              exact path="/user"
              render={() =>
                <ProfileView
                  movies={movies}
                  user={user}
                  handleFavoriteMovie={(user) => {this.props.setUser(user)}}
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

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);

MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string
  })
  ),
}