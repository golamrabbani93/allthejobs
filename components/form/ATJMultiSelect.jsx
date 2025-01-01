'use client';

import React from 'react';
import {useFormContext, Controller} from 'react-hook-form';
import Select from 'react-select';

export default function ATJMultiSelect({
	label,
	name,
	options,
	isMulti = true,
	isDisabled = false,
	isReadOnly = false,
}) {
	const {
		formState: {errors},
	} = useFormContext();

	return (
		<div className="mb-4">
			<Controller
				name={name}
				render={({field}) => {
					return (
						<Select
							{...field}
							id={name}
							options={options}
							isMulti={isMulti}
							isDisabled={isDisabled || isReadOnly}
							classNamePrefix="select"
							placeholder={`Select ${label}`}
							className={`${isDisabled || isReadOnly ? '!bg-gray-200' : ''} `}
						/>
					);
				}}
			/>
			{errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name]?.message}</span>}
		</div>
	);
}
