import React from 'react';
import './../less/home.less';
const Home = () => (
  <div className="home">
    <p>What do you want to expense for?</p>
    <a href="/trips">Trips</a>
    <span>or</span>
    <a href="/other">Purchase</a>
  </div>
);
export default Home;
