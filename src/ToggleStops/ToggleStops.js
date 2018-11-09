import React, {Component} from 'react';
import './ToggleStops.scss'
import data from "../data";
import _ from 'lodash'


class ToggleStops extends Component{
	constructor() {
		super();

		this.state = {
			transfer: [
				{
					id: -1,
					title: 'Все'
				},
				{
					id: 0,
					title: 'Без пересадок'
				},
				{
					id: 1,
					title: 'Все'
				},
				{
					id: -1,
					title: 'Все'
				}
			]
		}
	}

	getTransferTitleById(id) {
		switch(id) {
			case -1:
				return 'Все';
			case 0:
				return 'Без пересадок';
			case 1:
				return '1 пересадка';
			case 2:
			case 3:
			case 4:
				return `${id} пересадки`;
			default:
				return `${id} пересадок`;
		}
	}

	handleFilterChange(e) {
		console.log(e.target.value); /*---------------------------------------------------------------------------*/
	}

	handleSingleSelect(e) {

	}

	renderItem(index, id) {
		return (
			<div key={index} className='toggleItem'>
				<input
					type="checkbox"
					value={id}
					onChange={this.handleFilterChange.bind(this)}
					{...{id}}
				/>
				<label htmlFor={id}>{this.getTransferTitleById(id)}</label>
				<span onClick={this.handleSingleSelect.bind(this)}>ТОЛЬКО</span>
			</div>
		)
	}

	renderUniqValue() {
		let nonUniqueStops = this.renderStop();
		nonUniqueStops.push(-1);
		nonUniqueStops.sort((a, b) => a - b);

// TODO: сортировка после уникальности
		return _.uniq(nonUniqueStops)
	}

	renderUniqStops() {
		let countUniqStop = 0;
		let uniqStops = this.renderUniqValue();
		return uniqStops.map((index, id = uniqStops) => {
				return this.renderItem(index, id = uniqStops[countUniqStop++])
			}
		)
	}
	renderStops(ticket) {
		return (
			<div className={'stops'}>
				<h2>Количество пересадок</h2>
				<div className='toggleList'>
					{this.renderUniqStops(ticket)}

				</div>
			</div>
		)
	}

	renderStop() {
		const {tickets}= data;
		return tickets.map((ticket) => {
			return ticket.stops
		})
	}

	render() {
		return (
			<div className={'ToggleStops'}>
				{this.renderStops()}
			</div>
		);
	}
}

export default ToggleStops;