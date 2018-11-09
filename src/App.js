import React, { Component } from 'react';
import logo from './Img/logo.png';
import ToggleStops from './ToggleStops/ToggleStops'
import './App.scss';
import BuyTickets from "./BuyTickets/BuyTickets";

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header>
          <img className='mainLogo' src={logo} alt="logo" />
        </header>
	      <section>
		      <ToggleStops/>
		      <BuyTickets/>
	      </section>
      </div>
    );
  }
}

export default App;
