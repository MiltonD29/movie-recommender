import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from './views/home';
import SignInPage from './views/sign_in';
import SignUpPage from './views/sign_up';

export default () => (
  <Router>
    <div>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/signin" component={SignInPage} />
      <Route exact path="/signup" component={SignUpPage} />
    </div>
  </Router>
);
