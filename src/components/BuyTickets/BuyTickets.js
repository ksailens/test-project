import React, {Component} from 'react';
import './BuyTickets.scss';
import logo from '../../images/logoAir.png';
import Button from "../../ui/Button/Button";
import _ from 'lodash'
import PropTypes from 'prop-types';

class BuyTickets extends Component {

	constructor() {
		super();
		this.state = {
			massMonth: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
			dayOfWeek: ['Вск', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'] //массивы для расчета даты отправления и прибытия
		};
	}

	renderStops(ticket) { //проверка на окончание в зависимости от количества поездок
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
		if (last === 2 || last === 3 || last === 4 ) {
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

	renderDepartureDay(ticket) { // форматирование даты отправления
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

	renderArrivalDay(ticket) { // форматирование даты прибытия
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

	renderButton(ticket) { // форматирование цены билета
		const priceButton = ticket.price;
		return (
			// priceButton.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') // через регулярное выражение
			new Intl.NumberFormat('ru-RU').format(priceButton) // в зависимости от региона
		)
	}

	onDataSave() { // отклик кнопки
		console.log('Она работает');
		localStorage.setItem('key', 'value')
	}

	renderTrip(ticket, index) { // вывод контента блок билета
		return (
				<div key={index} className='trip'>
					<div className='forButton'>
						<img className='logoAir' src={logo} alt="logoAir" />
						<Button
							onClick={this.onDataSave}
						>
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

	renderTrips() { //  ...(1) выводим блоки для билетов
		const {tickets}= this.props;
		const newTickets = _.sortBy(tickets, [ ticket => ticket.price]); // новый массив, отсортированный по цене
		return newTickets.map((ticket, index) => { // берем массив, проходися по нему функцией и ...(1)
			return this.renderTrip(ticket, index)
		})
	}

	render() { // оболочка для блока с билетами
		return (
			<div className='BuyTickets'>
				{this.renderTrips()}
			</div>
		)
	}
}

BuyTickets.propTypes = { // проверка типа данных
	tickets: PropTypes.array,
};

export default BuyTickets;