import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

class Movie extends Component {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.string,
    poster: PropTypes.string
  }
  render() {
    const { id, title, year, poster } = this.props;
    return (
      <Link to={`/detail/${id}`} className="Movie__movie">
        <img src={poster} alt={title} className="Movie__movieImg" />
        <img src={poster} alt={title} className="Movie__movieImg Movie__movieImg_blured" />
        <div className="Movie__movieContent">
          <h3 className="Movie__movieContent-title">{title}</h3>
          <p className="Movie__movieContent-year">{year}</p>
        </div>
      </Link>
    );
  }
}

export default Movie;