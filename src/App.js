import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './_helpers';
import { alertActions } from './_actions';
import PrivateRoute from './_components/PrivateRoute';

import HomePage from './views/home';
import SignInPage from './views/sign_in';
import SignUpPage from './views/sign_up';

import 'bulma/css/bulma.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        {
          alert.message && 
          <div className={ `notification ${alert.type}` }>
            {alert.message}
          </div>
        }
        <Router history={ history }>
          <div>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/signup" component={SignUpPage} />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { alert } = state;
  return {
    alert
  }
}

export default connect(mapStateToProps)(App);
