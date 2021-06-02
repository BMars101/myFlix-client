import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';


const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props){
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if(visibilityFilter !== ''){
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if(!movies) return <div className="main-view"/>;

  return (
  <React.Fragment>
    <Col md={12} style={{ margin: 'auto', padding: "15px" }}>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} /> 
    </Col> 
      {filteredMovies.map(m => (
    <div style={{ margin: 'auto' }} key={m._id}>
      <Col md={3} >
        <MovieCard movie={m} /> 
      </Col>
     </div>  
  ))}
      
  </React.Fragment>
  )
}

export default connect(mapStateToProps)(MoviesList);