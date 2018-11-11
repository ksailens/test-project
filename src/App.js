import React, { Component } from 'react';
import logo from './images/logo.png';
import './App.scss';
import Filter from './components/FilterOfTransfers/Filter'
import BuyTickets from './components/BuyTickets/BuyTickets';
import load from './loadJSON/load'
import _ from 'lodash';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: null,
			filter: {
				transfers: [],
			},
		};

		this.loadData('database.json');
	}

	loadData(url) {
		load(url).then((data) => {
			this.setState({
				data: JSON.parse(data)
			});
		});
	}

	updateData(fieldName, value) {
		this.setState({
			[fieldName]: value,
		});
	}

	getFilteredTickets(tickets) {
		const { transfers } = this.state.filter;

		if (_.isEmpty(transfers)) {
			return tickets;
		}

		return tickets.filter(ticket => transfers.includes(ticket.stops));
	}

	renderHeader() {
		return (
			<header>
				<img className='mainLogo' src={logo} alt="logo" />
			</header>
		)
	}

	renderContent() {
		const { data } = this.state;
		if (!data) {
			return;
		}

		return (
			<section>
				<Filter
					updateState={this.updateData.bind(this)}
					{...this.state}
				/>
				<BuyTickets
					tickets={this.getFilteredTickets(data.tickets)}
				/>
			</section>
		);
	}

	render() {
		return (
			<div className='App'>
				{ this.renderHeader() }
				{ this.renderContent() }
			</div>
		);
	}

}

export default App;