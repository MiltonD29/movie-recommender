import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';

class SignInPage extends Component {

  constructor(props){
    super(props);

    // reses login status
    this.state = {
      email: '',
      password: '',
      submitted: false
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ submited: true })
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(userActions.signin(email, password));
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { email, password, submited } = this.state;
    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-6 is-offset-3">
              <div className="signin-box box is-vcentered">
                <h3 className="title has-text-white has-text-left">Inicia sesión</h3>
                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <div className="control has-icons-left">
                      <input
                        className={ (submited && !email) ? 'input is-medium is-danger' : 'input is-medium'}
                        type="email"
                        name="email"
                        value={ email }
                        onChange={ this.handleChange }
                        placeholder="Correo Electrónico"
                      />
                      <span className="icon is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                    {
                      submited && !email &&
                      <p className="help is-danger">Correo Electrónico inválido</p>
                    }
                  </div>

                  <div className="field">
                    <div className="control has-icons-left">
                      <input
                        className={ (submited && !password) ? 'input is-medium is-danger' : 'input is-medium'}
                        type="password"
                        name="password"
                        value={ password }
                        onChange={ this.handleChange }
                        placeholder="Contraseña"
                      />
                      <span className="icon is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                    {
                      submited && !email &&
                      <p className="help is-danger">Contraseña inválida</p>
                    }
                  </div>
                  <div className="field has-text-left">
                    <label
                      className="checkbox"
                      style={{color: '#B3B3B3'}}
                    >
                      <input
                        type="checkbox"
                        style={{marginRight: 10}}
                      />
                      Recuérdame
                    </label>
                  </div>
                  <button
                    className={loggingIn
                              ? 'signin-button button is-medium is-block is-fullwidth is-loading' 
                              : 'signin-button button is-medium is-block is-fullwidth'}
                  >
                    Iniciar sesión
                  </button>
                </form>
                <p className="signin-box-footer has-text-grey columns">
                  <Link to="/signup" className="column has-text-left" style={{color: '#B3B3B3'}}>
                    Regístrate
                  </Link> 
                  &nbsp;·&nbsp;
                  <Link to="/" className="column has-text-right" style={{color: '#B3B3B3'}}>
                    ¿Necesitas ayuda?
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  }
}

export default connect(mapStateToProps)(SignInPage);