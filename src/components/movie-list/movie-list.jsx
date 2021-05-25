import React from 'react';
import { connect } from 'react-redux';
import VisibilityFilterInput from 'react-redux';
import { MovieCard } from '../movie-card/movie-card';


const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props){
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if(visibilityFilter !== ''){
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  if(!movies) return <div className="main-view"/>;

  return (
  <div>
    <VisibilityFilterInput visibilityFilter={visibilityFilter} />   
    {filteredMovies.map(m => (  
      <MovieCard movie={m} />   
  ))}
  </div>
  )
}

export default connect(mapStateToProps)(MoviesList);