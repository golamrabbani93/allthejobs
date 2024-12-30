'use client';

import React from 'react';
import {useFormContext} from 'react-hook-form';

export default function ATJTextArea({name, isReadOnly = false, disabled = false}) {
	const {
		register,
		formState: {errors},
	} = useFormContext();

	return (
		<div className="mb-4">
			<textarea
				id={name}
				{...register(name)}
				placeholder={`Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position,`}
				readOnly={isReadOnly}
				disabled={disabled}
				className={`${disabled ? '!bg-gray-200' : ''}`}
			/>
			{errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>}
		</div>
	);
}
