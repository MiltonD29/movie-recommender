import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackToHome } from '../../_components//BackButton';
import { apiConstants } from '../../_constants';

// const API_KEY = 'd0890cc9';
const API_KEY = 'b1c29d87a1dae3154be02e655610ca45';
const imageUrl = 'https://image.tmdb.org/t/p/w342/';

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
    movie: {},
    alert: {
      className: '',
      hidden: true,
      message: ''
    }
  }

  _handleFavorite = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    const { imdb_id } = this.state.movie;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + user.token
      },
      body: JSON.stringify({ imdb_id })
    };

    fetch(`${ apiConstants.API_DOMAIN }/view-logs`, requestOptions)
    .then((response) => {
      if(response.ok) {
        this.setState({
          alert: {
            ...this.state.alert,
            className: 'is-success',
            hidden: false,
            message: 'Agregado a tus Favoritos'
          }
        });
      }
    })
    .catch((error) => {
      this.setState({
        alert: {
          ...this.state.alert,
          className: 'is-danger',
          hidden: false,
          message: error.message
        }
      });
    });
  }

  _hiddenAlert = () => {
    this.setState({
      alert: {
        ...this.state.alert,
        hidden: true
      }
    });
  }

  _fetchMovie = ({ id }) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-MX`)
      .then(res => res.json())
      .then(movie => {
        this.setState({
          movie
        });
      })
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this._fetchMovie({ id })
  }

  render() {

    const {
      title,
      overview,
      original_language,
      release_date,
      vote_average,
      poster_path,
      runtime
    } = this.state.movie

    const { alert } = this.state;

    return (
      <div className="Detail">
        <div className="Detail__card">
          <div className="Detail__column Detail__column_img">
            <img src={imageUrl + poster_path} alt={title} className="Detail__poster Detail__poster_blured"/>
            <img src={imageUrl + poster_path} alt={title} className="Detail__poster"/>
          </div>
          <div className="Detail__column Detail__description">
            <h2 className="Detail__title title">{title}</h2>
            <div className="tags">
              <p className="tag is-rounded">{release_date}</p>
              <p className="tag is-rounded">{original_language}</p>
              
              <p className="tag is-rounded">{runtime} min</p>
            </div>
            <p>
              <strong>Rating:</strong> <span className="tag is-warning"><i className="fas fa-star Detail__star"></i>{vote_average}</span>
            </p>
            <p>
              <strong>Descripción:</strong>
              <br/>
              {overview}
            </p>
            <div className="Detail__footer columns">
              <div className="column is-6">
                <BackToHome/>
              </div>
              <div className="column is-6">
                <button 
                  className="button is-primary is-rounded"
                  onClick={ this._handleFavorite }
                >
                  <i className="fas fa-star" style={{marginRight: 6}}></i> Favorito
                </button>
              </div>
            </div>
            <div className="columns">
              <div className="column">
              {
                alert.hidden 
                ? null
                : <div className={"notification " + alert.className}>
                    <button onClick={ this._hiddenAlert } className="delete"></button>
                    { alert.message }
                  </div>
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;