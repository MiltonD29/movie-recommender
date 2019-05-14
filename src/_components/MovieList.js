import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Movie from './Movie';

const imageUrl = 'https://image.tmdb.org/t/p/w342/'

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
                key={ movie.id }
                id={ movie.id }
                title={ movie.title }
                overview={ movie.overview }
                poster={ imageUrl + movie.poster_path }
              />
            )
          })
        }
      </div>
    )
  }
}

export default MoviesList;