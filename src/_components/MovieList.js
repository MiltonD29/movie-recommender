import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Movie from './Movie';

class MoviesList extends Component {
  static propTypes = {
    movies: PropTypes.array
  }
  render() {
    const { movies } = this.props;
    return (
      <div className="MovieList__results">
        {
          movies.map( movie => {
            return (
              <Movie
                key={ movie.imdbID }
                id={ movie.imdbID }
                title={ movie.Title }
                year={ movie.Year }
                poster={ movie.Poster }
              />
            )
          })
        }
      </div>
    )
  }
}

export default MoviesList;