import React, { Component } from 'react';
import { BackToHome } from '../../_components/BackButton';
import { apiConstants } from '../../_constants';
import Movie from '../../_components/Movie';

const API_KEY = 'b1c29d87a1dae3154be02e655610ca45';
const imageUrl = 'https://image.tmdb.org/t/p/w342/';

class UserProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {},
      recommendedMovies: []
    }
  }

  componentDidMount() {
    this._fetchUser()
    this._fetchRecommendations()
  }
  
  _fetchRecommendations = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + user.token
      }
    };
    fetch(`${ apiConstants.API_DOMAIN }/recommendations`, requestOptions)
      .then(res => res.json())
      .then(recommendation => {
        recommendation.data.forEach(element => {
          element.results.forEach(elementId => {
            fetch(`https://api.themoviedb.org/3/movie/${elementId}?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(recommendedMovie => {
              this.state.recommendedMovies.push(recommendedMovie)
            })
          });
        });
      })
  }

  _generateRecommendation = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + user.token
      }
    };
    fetch(`${ apiConstants.API_DOMAIN }/recommendations`, requestOptions)
      .then(res => res.json())
      .then(recommendation => {
        console.log(recommendation);
      })
  }

  _renderRecommendedMovies () {
    const { recommendedMovies } = this.state;
    let recommended = recommendedMovies.map((movie) => {
      return (
        <Movie
          key={ movie.id }
          id={ movie.id }
          title={ movie.title }
          overview={ movie.overview }
          poster={ imageUrl + movie.poster_path }
        />
      )
    });
    return recommended
  }

  _fetchUser = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + user.token
      }
    };
    fetch(`${ apiConstants.API_DOMAIN }/auth/me`, requestOptions)
      .then(res => res.json())
      .then(user => {
        this.setState({
          user
        });
      })
  }

  render() {
    const { name, email } = this.state.user;
    const { recommendedMovies } = this.state
    console.log(this.state.recommendedMovies);
    return (
      <div className="user-profile">
        <section className="hero is-medium is-primary is-bold">
          <div className="hero-body">
            <div className="container">
            <div className="columns">
              <div className="column is-2">
                <figure className="image is-128x128">
                  <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" alt="avatar" />
                </figure>
              </div>
              <div className="column is-10">
                <h1 className="title">
                  { name }
                </h1>
                <h2 className="subtitle">
                  { email }
                </h2>
                <div className="column is-4">
                  <div className="columns">
                    <div className="column">
                      <BackToHome/>
                    </div>
                    <div className="column">
                      <button 
                        className="button is-info is-rounded"
                        onClick={ this._generateRecommendation }
                      >
                        <i className="fas fa-star" style={{marginRight: 6}}></i> Recomendar ahora
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>
        <section className="hero is-medium is-bold">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">Recomendaciones para ti</h1>
              <div className="MovieList__results">
                {
                  recommendedMovies
                  ? this._renderRecommendedMovies()
                  : <h1 className="subtitle">No hay recomendaciones</h1>
                }
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default UserProfile;