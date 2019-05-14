import React, { Component } from 'react';

// Components
import { Title } from '../../_components/Title';
import SearchForm from '../../_components/SearchForm';
import MoviesList from '../../_components/MovieList';

class Search extends Component {
  state = {
    results: [],
    usedSearch: false
  }

  _handleResults = (results) => {
    this.setState({
      results,
      usedSearch: true
    });
  }

  _renderResults = () => {
      return this.state.results.length === 0
      ? <p>¡UPS! No se encontraron resultados</p>
      : <MoviesList movies={ this.state.results }/>
  }

  render() {
    return (
      <div className="Search">
        <div className="Search__container">
          <div className="Search__form">
            <Title>Buscador de películas</Title>
            <SearchForm
              onResults={ this._handleResults }
            />
          </div>
          <div className="Search__description">
            {
              this.state.usedSearch
              ? this._renderResults()
              : <h6>Puedes buscar películas, series o videojuegos</h6>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Search;