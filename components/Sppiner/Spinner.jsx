import React from 'react';

const Spinner = ({type = 'border', color = 'primary', size = 'sm', text, className = ''}) => {
	return (
		<div className={`text-center ${className}`}>
			<div
				className={`spinner-${type} text-${color} ${size ? `spinner-${type}-${size}` : ''}`}
				role="status"
			></div>
		</div>
	);
};

export default Spinner;
