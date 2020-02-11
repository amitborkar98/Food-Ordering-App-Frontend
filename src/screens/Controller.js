import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../common/header/Header';
import Profile from '../screens/profile/Profile';

class Controller extends Component {

  render() {
    return (
      <Router>
        <div className="main-container">
          <Route exact path='/' render={(props) => <Header {...props} />} />
          <Route exact path='/profile' render={(props) => <Profile {...props} />} />
        </div>
      </Router>
    )
  }
}

export default Controller;