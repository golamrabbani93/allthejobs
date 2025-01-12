'use client';

import React from 'react';
import {useFormContext, Controller} from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ATJDatePicker = ({name, isReadOnly = false, disabled = false, format = 'dd-MM-yyyy'}) => {
	const {
		control,
		formState: {errors},
	} = useFormContext();

	return (
		<div className="mb-4">
			<Controller
				name={name}
				control={control}
				defaultValue={null}
				render={({field}) => (
					<DatePicker
						minDate={new Date('2025-01-01')}
						{...field}
						selected={field.value}
						onChange={(date) => field.onChange(date)}
						dateFormat={format}
						// readOnly={isReadOnly}
						// disabled={disabled}
						placeholderText="Select a date"
						className={` border rounded px-3 py-2 focus:outline-none focus:ring ${
							disabled ? 'bg-gray-200' : ''
						}`}
					/>
				)}
			/>
			{errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>}
		</div>
	);
};

export default ATJDatePicker;
