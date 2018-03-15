import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect, Switch,Link,NavLink} from 'react-router-dom';
import {Provider, connect} from 'react-redux';
import {createStore} from 'redux';

import {expensesApp} from '../store.js';

import TripsHome from './TripsHome.jsx';
import TripDetails from './TripDetails.jsx';
import PurchaseHome from './PurchaseHome.jsx';
import Home from './Home.jsx';
import './../less/main.less';
import {withRouter} from 'react-router-dom';


const contentNode = document.getElementById("container");
const NoMatch = () => (<p>No match found</p>);

let App = () => (
  <BrowserRouter>
    <div className="app">
      <header>
          <div>XpenseWiz</div>
      </header>
      <div  className="container" >
        <Switch>
          <Route exact path="/" render={()=><Redirect to="/home" />} />
          <Route path="/tripDetails" component={TripDetails} />
          <Route path="/trips" component={TripsHome} />
          <Route path="/other" component={PurchaseHome} />
          <Route path="/home" component={Home} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  <Provider store = {createStore(expensesApp)}>
    <App />
  </Provider>,
  contentNode
);
