import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TransferSelector from './TransferSelector/TransferSelector';

class Filter extends Component { // оболочка для фильтра билетов
	render() {
		return (
			<div className={'Filter'}>
				<TransferSelector
					{ ...this.props }
				/>
			</div>
		)
	}
}

Filter.propTypes = { // проверка типов данных
	data: PropTypes.object,
	filter: PropTypes.object,
	updateState: PropTypes.func,
};

export default Filter;