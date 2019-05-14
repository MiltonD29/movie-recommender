import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// const API_KEY = 'd0890cc9';
const API_KEY = 'b1c29d87a1dae3154be02e655610ca45'
const imageUrl = 'https://image.tmdb.org/t/p/w342/'

class SearchForm extends Component {
  state = {
    inputMovie: '',
    suggestions: []
  }

  _handleChange = (e) => {
    this.setState({
      inputMovie: e.target.value
    });
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    const { inputMovie } = this.state;
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${inputMovie}&language=es-MX&include_adult=false`)
      .then(res => res.json())
      .then(res => {
        const { results = [] } = res;
        this.setState({
          suggestions: results
        });
        this.props.onResults(results);
      })
  }

  render() {
    const { suggestions } = this.state;
    return (
      <form onSubmit={ this._handleSubmit }>
        <div className="SearchForm__inputContainer">
          <input
            className="SearchForm__input has-text-success"
            onChange={ this._handleChange }
            type="text"
            placeholder="Buscar..."
          />
          {
            suggestions.length > 0 ?
            <div className="list">
              {
                suggestions.map(element => {
                  return (
                    <Link key={element.id} className="list-item columns is-vcentered" to={`/detail/${element.id}`}>
                      <figure className="column is-4 image is-480x600">
                        <img src={ imageUrl + element.poster_path || 'https://bulma.io/images/placeholders/480x600.png' } alt="movie" />
                      </figure>
                      <div className="column">
                        <p className="is-size-4 has-text-black">{ element.title }</p>
                      </div>
                    </Link>
                  )
                })
              }
            </div>
            : null
          }
          <button className="SearchForm__submit has-text-success">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
    );
  }
}

export default SearchForm;