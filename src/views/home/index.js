import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SearchForm from '../../_components/SearchForm';
import MoviesList from '../../_components/MovieList';
import { Title } from '../../_components/Title';

class HomePage extends Component {

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
      <div>
        <section className="home hero is-info is-fullheight">
          <div className="hero-head">
            <nav className="navbar">
              <div className="container">
                <div className="navbar-brand">
                  <Link to="/" className="navbar-item">
                    <h1 className="title">FIMETFLIX</h1>
                  </Link>
                  <span className="navbar-burger burger" data-target="navbarMenu">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>
                <div id="navbarMenu" className="navbar-menu">
                  <div className="navbar-end">
                    <span className="navbar-item">
                      <Link to="/" className="button is-white is-outlined">
                        <span className="icon">
                          <i className="fa fa-home"></i>
                        </span>
                        <span>Inicio</span>
                      </Link>
                    </span>
                    <span className="navbar-item">
                      <Link to="/profile" className="button is-white is-outlined">
                        <span className="icon">
                          <i className="fa fa-user"></i>
                        </span>
                        <span>Mi Perfil</span>
                      </Link>
                    </span>
                    <span className="navbar-item">
                      <Link
                        to="/signin"
                        className="button is-white is-outlined"
                      >
                        <span className="icon">
                          <i className="fa fa-sign-out-alt"></i>
                        </span>
                        <span>Cerrar Sesión</span>
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="column is-6 is-offset-3">
                <h1 className="title">
                  Buscar Películas
                </h1>
                <h2 className="subtitle">
                  Puedes buscar películas, series o videojuegos
                </h2>
                <SearchForm onResults={ this._handleResults } />
              </div>
            </div>
          </div>
        </section>

        {
          this.state.usedSearch
          ?
          <div className="Search">
            <div className="Search__container">
              <div className="Search__form">
                <Title>Resultados</Title>
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
        : 
        null
        }
      </div>
    );
  }
}

export default HomePage;