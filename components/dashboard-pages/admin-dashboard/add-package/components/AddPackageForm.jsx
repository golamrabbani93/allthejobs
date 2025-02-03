'use client';

import ATJInput from '@/components/form/ATJInput';
import {useState} from 'react';
import {useForm, Controller, FormProvider, useFieldArray} from 'react-hook-form';

const AddPackageForm = () => {
	const initialOptions = [
		{value: 'registration', label: 'Registration', enabled: true},
		{value: 'profileUpdate', label: 'Profile Update', enabled: true},
		{value: 'jobSearchApply', label: 'Job Search & Apply', enabled: true},
		{value: 'jobMatchSuggestion', label: 'Job Match Suggestion', enabled: false},
		{value: 'idVerification', label: 'ID Verification', enabled: false},
		{value: 'profileReview', label: 'Profile Review', enabled: false},
		{value: 'resumeCoverLetter', label: 'Resume & Cover Letter', enabled: false},
		{value: 'jobApplyAutopilot', label: 'Job Apply Autopilot', enabled: false},
		{value: 'featuredProfile', label: 'Featured Profile', enabled: false},
		{value: 'askAI', label: 'Ask AI', enabled: false},
		{value: 'earlyAccessJobListings', label: 'Early Access Job Listings', enabled: false},
		{value: 'interviewPreparation', label: 'Interview Preparation', enabled: false},
		{value: 'skillImprovementResources', label: 'Skill Improvement Resources', enabled: false},
		{value: 'careerWebinars', label: 'Career Webinars', enabled: false},
	];

	const [options, setOptions] = useState(initialOptions);

	const methods = useForm({
		defaultValues: {
			selectedFeatures: [],
			isEnabled: [],
		},
	});

	const {control, handleSubmit, setValue, watch} = methods;

	const {fields, append, remove} = useFieldArray({
		control,
		name: 'features',
	});

	const handleFirstSelect = (selectedValue, index) => {
		if (selectedValue) {
			const selectedFeatures = watch('selectedFeatures');
			selectedFeatures[index] = selectedValue;
			setValue('selectedFeatures', selectedFeatures);

			const isEnabled = watch('isEnabled');
			const feature = initialOptions.find((option) => option.value === selectedValue);
			isEnabled[index] = feature ? feature.enabled : false;
			setValue('isEnabled', isEnabled);

			// Reorder the options to move the selected one to the top
			const newOptions = [
				feature,
				...initialOptions.filter((option) => option.value !== selectedValue),
			];

			setOptions(newOptions);
		}
	};

	const addField = () => {
		append({value: ''}); // Add new field for feature
	};

	const onSubmit = (data) => {
		console.log('Form submitted:', data);
	};

	return (
		<div className="widget-content">
			<div className="widget-title"></div>
			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="default-form">
						<div className="row">
							<div>
								<div className="form-group col-lg-6 col-md-12">
									<label>Degree Name</label>
									<ATJInput type={'text'} label="Bachelors in Fine Arts" name="degreeName" />
								</div>
							</div>

							{/* Render each feature field */}
							{fields.map((field, index) => (
								<div key={field.id} className="flex items-center space-x-6 mb-4">
									{/* Select Feature */}
									<div className="flex-1">
										<Controller
											name={`features[${index}].value`}
											control={control}
											render={({field}) => (
												<div className="form-group">
													<label>Select Feature:</label>
													<select
														{...field}
														value={field.value || ''}
														onChange={(e) => {
															const selectedOption = initialOptions.find(
																(option) => option.value === e.target.value,
															);
															field.onChange(selectedOption.value);
															handleFirstSelect(selectedOption.value, index);
														}}
													>
														<option value="" disabled>
															Select a Feature
														</option>
														{options.map((option) => (
															<option key={option.value} value={option.value}>
																{option.label}
															</option>
														))}
													</select>
												</div>
											)}
										/>
									</div>

									{/* Is Enabled */}
									<div className="flex-1">
										<Controller
											name={`features[${index}].isEnabled`}
											control={control}
											render={({field}) => (
												<div className="form-group">
													<label>Is Enabled:</label>
													<select
														{...field}
														value={String(field.value)} // Convert boolean to string
														onChange={(e) => field.onChange(e.target.value === 'true')}
													>
														<option value="true">True</option>
														<option value="false">False</option>
													</select>
												</div>
											)}
										/>
									</div>

									{/* Remove Feature Button */}
									<button
										type="button"
										onClick={() => remove(index)}
										className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
									>
										Remove
									</button>
								</div>
							))}
							<div className="mb-5">
								{/* Button to add new feature */}
								<button
									type="button"
									onClick={addField}
									className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
								>
									Add Feature
								</button>
							</div>

							<div className="space-x-4 mt-6">
								<button
									type="submit"
									className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
								>
									Submit
								</button>
							</div>
						</div>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export default AddPackageForm;
