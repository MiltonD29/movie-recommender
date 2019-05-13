import React, { Component } from 'react';

const API_KEY = 'd0890cc9';

class SearchForm extends Component {
  state = {
    inputMovie: ''
  }

  _handleChange = (e) => {
    this.setState({
      inputMovie: e.target.value
    });
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    const { inputMovie } = this.state;
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${inputMovie}`)
      .then(res => res.json())
      .then(results => {
        const { Search = [], totalResults = "0" } = results;
        console.log({ Search, totalResults });
        this.props.onResults(Search);
      })
  }

  render() {
    return (
      <form onSubmit={ this._handleSubmit }>
        <div className="SearchForm__inputContainer">
          <input
            className="SearchForm__input has-text-danger"
            onChange={ this._handleChange }
            type="text"
            placeholder="Buscar..."
          />
          <button className="SearchForm__submit has-text-danger">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
    );
  }
}

export default SearchForm;