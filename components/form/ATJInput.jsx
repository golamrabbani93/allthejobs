'use client';

import React from 'react';
import {useFormContext} from 'react-hook-form';

export default function ATJInput({type, label, name, isReadOnly = false}) {
	const {
		register,
		formState: {errors},
	} = useFormContext();

	return (
		<div className="mb-4">
			<input id={name} {...register(name)} type={type} placeholder={label} readOnly={isReadOnly} />
			{errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>}
		</div>
	);
}
