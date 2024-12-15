'use client';

import React, {useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';

export default function ATJForm({children, onSubmit, defaultValues, resolver}) {
	// Initialize the form with resolver and default values
	const methods = useForm({
		defaultValues,
		resolver,
	});

	// Reset form whenever defaultValues changes
	useEffect(() => {
		if (defaultValues) {
			methods.reset(defaultValues); // Reset with new default values
		}
	}, [defaultValues, methods]);

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
		</FormProvider>
	);
}
