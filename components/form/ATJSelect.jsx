'use client';

import React from 'react';
import {useFormContext} from 'react-hook-form';

export default function ATJSelect({
	label,
	name,
	options = [],
	isReadOnly = false,
	disabled = false,
}) {
	const {
		register,
		formState: {errors},
	} = useFormContext();

	return (
		<div className="mb-4">
			<select
				id={name}
				{...register(name)}
				readOnly={isReadOnly}
				disabled={disabled}
				className={`form-select chosen-single form-select ${disabled ? '!bg-gray-200' : ''}`}
			>
				<option value="" disabled>
					{label}
				</option>
				{options.map((option, index) => (
					<option key={index} value={option}>
						{option}
					</option>
				))}
			</select>
			{errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>}
		</div>
	);
}
