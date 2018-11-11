import React, {Component} from 'react';
import './TransferSelector.scss'
import _ from 'lodash'
import PropTypes from 'prop-types';
import update from 'immutability-helper';


const TRANSFERS_ALL_ID = -1; // добавим общую константу, чтоб было понятно, что это за дичь такая, -1

class NumberOfTransfers extends Component {

	getTransferTitleById(id) {
		switch(id) {
			case TRANSFERS_ALL_ID:
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

	getTransfersDifference(value) {
		const { transfers } = this.props.filter;

		const filterTransfers = _.clone(transfers);
		filterTransfers.push(value);

		return _.difference(this.getUniqueTransfersIds(), filterTransfers)
	}

	filterSelect(value) {

		const { filter } = this.props;
		const { transfers } = filter;

		let index = transfers.indexOf(value);
		if (transfers.includes(value)) {
			const allIndex = transfers.indexOf(TRANSFERS_ALL_ID);
			return update(filter, { // метод update - хелпер, позволяющий обновлять свойства объектов - https://github.com/kolodny/immutability-helper
				transfers: {
					$splice: [
						[index, 1], // удаляем 1 элемент, начиная с индекса index (прост удаляем элемент из массива)
						(allIndex >= 0) ? [allIndex, 1] : [], // Удаляем элемент 'Все'(если он есть), если удалился хоть один элемент полного массива с айдишниками пересадок.
					                                        // indexOf, если не находит элемент, возвращает -1.
					                                        // Нам нужны только положительные числа или 0.
					],
				}
			})
		} else {
			if (value === TRANSFERS_ALL_ID) {
				return update(filter, {
					transfers: {
						$set: this.getAllUniqueTransfersIds()
					}
				});
			} else {
				if (_.isEmpty(this.getTransfersDifference(value))) {
					return update(filter, {
						transfers: {
							$set: this.getAllUniqueTransfersIds() }
					});
				} else {
					return update(filter, {
						transfers: {
							$push: [value] } // добавляем в массив transfers новый элемент
					});
				}
			}
		}
	}

	handleFilterChange(e) {
		const value = parseInt(e.target.value); //
		this.props.updateState('filter', this.filterSelect(value));
	}

	handleSingleSelect(id) { // -----------------------------------
		const { filter } = this.props;
		this.props.updateState('filter',
			update(filter, {
				transfers: {
					$set: [id]
				}
			}));
	}

	renderItem(id, index) {
		const { transfers } = this.props.filter;
		return (

			<div key={index} className='toggleItem'>
				<input
					type="checkbox"
					value={id}
					onChange={this.handleFilterChange.bind(this)}
					checked={transfers.includes(id)}
					{...{id}}
				/>
				<label htmlFor={id}>{this.getTransferTitleById(id)}</label>
				{TRANSFERS_ALL_ID !== id ? <span onClick={this.handleSingleSelect.bind(this, id)}>ТОЛЬКО</span> : null}
			</div>
		)
	}

	getUniqueTransfersIds() {
		const nonUniqueStops = this.renderStop();
		return _.uniq(nonUniqueStops).sort((a, b) => a - b);
	}

	getAllUniqueTransfersIds() {
		const uniqueTransfersIds = this.getUniqueTransfersIds();
		uniqueTransfersIds.unshift(TRANSFERS_ALL_ID);

		return uniqueTransfersIds;
	}

	renderUniqueStops() {
		const uniqueStops = this.getAllUniqueTransfersIds();
		return uniqueStops.map((uniqueStop, index) => {
			return this.renderItem(uniqueStop, index)
		});
	}

	renderStops(ticket) {
		return (
			<div className={'stops'}>
				<h2>Количество пересадок</h2>
				<div className='toggleList'>
					{this.renderUniqueStops(ticket)}
				</div>
			</div>
		)
	}

	renderStop() {
		const { tickets } = this.props.data;

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

NumberOfTransfers.propTypes = {
	data: PropTypes.object,
	filter: PropTypes.object,
	updateState: PropTypes.func,
};

export default NumberOfTransfers;