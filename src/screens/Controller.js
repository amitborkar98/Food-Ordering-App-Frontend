import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from '../screens/profile/Profile';
import Home from './home/Home';

class Controller extends Component {

  render() {
    return (
      <Router>
        <div className="main-container">
          <Route exact path='/' render={(props) => <Home {...props} />} />
          <Route exact path='/profile' render={(props) => <Profile {...props} />} />
        </div>
      </Router>
    )
  }
}

export default Controller;