import React, {Component} from 'react';
import './BuyTickets.scss';
import logo from '../Img/logoAir.png';
import Button from "../Button/Button";
import data from '../data'
import {sortBy} from 'lodash'

class BuyTickets extends Component {

	constructor() {
		super();
		this.state = {
			massMonth: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
			dayOfWeek: ['Вск', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
		};

		this.getMoviesFromApiAsync();
	}


	getMoviesFromApiAsync() {
		return fetch('http://127.0.0.1:8080/database.json', { mode: 'no-cors' })
			.then((response) => response.json())
			.then((responseJson) => {
				return responseJson;
			})
			.catch((error) => {
				console.error(error);
			});
	}

	renderStops(ticket) {
		let last = ticket.stops % 10;

		if (last === 0) {
			return (
				<p className='plane'/>
			)
		}
		if (last === 1) {
			return (
				<p className='plane'>{ticket.stops + ' пересадка'}</p>
			)
		}
		if (last === 2 || last === 3 || last === 3) {
			return (
				<p className='plane'>{ticket.stops + ' пересадки'}</p>
			)
		}
		if (last >= 5) {
			return (
				<p className='plane'>{ticket.stops + ' пересадок'}</p>
			)
		}
	}

	renderDepartureDay(ticket) {
		const [day, month, year] = ticket.departure_date.split(".");
		const dayWeek = this.state.dayOfWeek;
		const monthYear = this.state.massMonth;
		let newDay = new Date('20'+year, month-1, day);
		let dayD = newDay.getDay();
		return (
			<p>
				{day} {monthYear[month-1]} {'20'+year}, {dayWeek[dayD]}
			</p>
		)
	}

	renderArrivalDay(ticket) {
		const [day, month, year] = ticket.arrival_date.split(".");
		const dayWeek = this.state.dayOfWeek;
		const monthYear = this.state.massMonth;
		let newDay = new Date('20'+year, month-1, day);
		let dayD = newDay.getDay();
		return (
			<p>
				{day} {monthYear[month-1]} {'20'+year}, {dayWeek[dayD]}
			</p>
		)
	}

	renderButton(ticket) {
		const priceButton = ticket.price;
		return (
			priceButton.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
		)
	}

	onDataSave() {
		console.log('adadadsa')
		// localStorage.setItem('token', )
	}

	renderTrip(ticket, index) {
		return (
				<div key={index} className='trip'>
					<div className='forButton'>
						<img className='logoAir' src={logo} alt="logoAir" />
						<Button
							onBuy={this.onDataSave}>
							Купить <br/> за <span>{this.renderButton(ticket)} P</span>
						</Button>
					</div>
					<div className='pointA'>
						<h2>{ticket.departure_time}</h2>
						<h3>{ticket.origin}, {ticket.origin_name}</h3>
						{this.renderDepartureDay(ticket)}
					</div>
					{this.renderStops(ticket)}
					<div className='pointB'>
						<h2>{ticket.arrival_time}</h2>
						<h3>{ticket.destination_name}, {ticket.destination}</h3>
						{this.renderArrivalDay(ticket)}
					</div>
				</div>
		);
	}

	renderTrips() {
		const {tickets}= data;
		const newTickets = sortBy(tickets, [ o => o.price]);
		return newTickets.map((ticket, index) => {
			return this.renderTrip(ticket, index)
		})
	}

	render() {
		return (
			<div className='BuyTickets'>
				{this.renderTrips()}
			</div>
		)
	}
}

export default BuyTickets;