'use client';

import React from 'react';
import {useFormContext, Controller} from 'react-hook-form';
import ReactStars from 'react-rating-stars-component';

export default function ATJRating({name}) {
	const {
		control,
		formState: {errors},
	} = useFormContext();

	return (
		<div className="mb-4">
			<Controller
				name={name}
				control={control}
				defaultValue={0} // Default rating value
				render={({field}) => (
					<ReactStars
						count={5}
						value={field.value}
						onChange={field.onChange} // Updates form state
						size={30}
						activeColor="#ffd700"
					/>
				)}
			/>
			{errors[name] && <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>}
		</div>
	);
}
