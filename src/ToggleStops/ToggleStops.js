import React, {Component} from 'react';
import './ToggleStops.scss'
import data from "../data";
import {uniq} from 'lodash'


class ToggleStops extends Component{

	renderTextItem() {
		const uniqS = this.renderUniqValue();
		console.log(uniqS);
		for (let i = 0; i <= uniqS.length; i++) {
			let last = uniqS[i] % 10;
			//console.log(i)
			if (last === -1) {
				return (
					'Все'
				)
			}
			if (last === 0) {
				return (
					'Без пересадок'
				)
			}
			if (last === 1) {
				return (
					'1 пересадка'
				)
			}
			if (last === 2 || last === 3 || last === 4) {
				return (
					`${last} пересадки`
				)
			}
			if (last >= 5) {
				return (
					`${last} пересадок`
				)
			}
		}
	}

	renderItem(index, id) {
		return (
			<div key={index} className='toggleItem'>
				<input type="checkbox" id={id} /><label htmlFor={id}>{this.renderTextItem()}</label><a>ТОЛЬКО</a>
			</div>
		)
	}

	renderUniqValue() {
		let nonUniqueStops = this.renderStop();
		nonUniqueStops.push(-1);
		nonUniqueStops.sort((a, b) => a - b);
		return uniq(nonUniqueStops)
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