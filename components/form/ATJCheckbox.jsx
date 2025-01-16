'use client';

import React from 'react';
import {useFormContext} from 'react-hook-form';

export default function ATJCheckbox({name, label, disabled = false}) {
	const {
		register,
		formState: {errors},
	} = useFormContext();

	return (
		<div className="flex items-center mb-4">
			<input
				type="checkbox"
				id={name}
				{...register(name)}
				disabled={disabled}
				className={`h-4 w-4 text-blue-600 border-gray-500 rounded focus:ring-blue-500 ${
					disabled ? 'cursor-not-allowed' : ''
				}`}
				onChange={(e) => {
					register(name).onChange(e);
				}}
			/>
			<label
				htmlFor={name}
				className={`ml-2 text-sm ${disabled ? 'text-gray-400' : 'text-gray-700'}`}
			>
				{label}
			</label>
			{errors[name] && <span className="text-red-500 text-sm ml-2">{errors[name].message}</span>}
		</div>
	);
}
