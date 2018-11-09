import React from 'react'
import './Button.scss'

const Button = props => {

	return (
		<button
			onClick={props.onBuy}
			className='Button'
		>
			{props.children}
		</button>
	)
};

export default Button