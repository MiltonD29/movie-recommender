import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackToHome } from '../components/BackToHome';

const API_KEY = 'd0890cc9';

class Detail extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
      isExact: PropTypes.bool,
      path: PropTypes.string,
      url: PropTypes.string
    })
  }

  state = {
    movie: {}
  }

  _fetchMovie = ({ id }) => {
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
      .then(res => res.json())
      .then(movie => {
        console.log({ movie });
        this.setState({
          movie
        });
      })
  }

  componentDidMount() {
    console.log(this.props);
    const { id } = this.props.match.params;
    this._fetchMovie({ id })
  }

  render() {
    const {
      Title, 
      Actors, 
      Country, 
      Released, 
      Type, 
      imdbRating, 
      Poster,
      Runtime
    } = this.state.movie
    return (
      <div className="Detail">
        <div className="Detail__card">
          <div className="Detail__column Detail__column_img">
            <img src={Poster} alt={Title} className="Detail__poster Detail__poster_blured"/>
            <img src={Poster} alt={Title} className="Detail__poster"/>
          </div>
          <div className="Detail__column Detail__description">
            <h2 className="Detail__title title">{Title}</h2>
            <div className="tags">
              <p className="tag is-rounded">{Released}</p>
              <p className="tag is-rounded">{Country}</p>
              <p className="tag is-rounded">{Type}</p>
              <p className="tag is-rounded">{Runtime}</p>
            </div>
            <p>
              <strong>Rating:</strong> <span className="tag is-warning"><i className="fas fa-star Detail__star"></i> {imdbRating}</span>
            </p>
            <p>
              <strong>Actors:</strong>
              <br/>
              {Actors}
            </p>
            <div className="Detail__footer columns">
              <div className="column is-6">
                <BackToHome/>
              </div>
              <div className="column is-6">
                <button className="button is-primary">
                  <i className="fas fa-star" style={{marginRight: 6}}></i> Favorito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;