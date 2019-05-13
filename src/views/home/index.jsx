import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {

  render() {
    return (
      <div>
        Has iniciado sesión
        <Link to="/signin">
          Logout
        </Link>
      </div>
    );
  }
}

export default HomePage;