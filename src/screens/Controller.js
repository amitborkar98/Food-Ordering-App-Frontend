import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from '../screens/profile/Profile';
import Home from './home/Home';
import Details from './details/Details';
import Checkout from './checkout/Checkout';

class Controller extends Component {

  render() {
    return (
      <Router>
        <div className="main-container">
          <Route exact path='/' render={({history}, props) => <Home history={history} {...props} />} />
          <Route exact path='/profile' render={(props) => <Profile {...props} />} />
          <Route path='/restaurant/:id' render={(props) => <Details {...props} />} />
          <Route path='/checkout' render={(props) => <Checkout {...props} />} />
        </div>
      </Router>
    )
  }
}

export default Controller;