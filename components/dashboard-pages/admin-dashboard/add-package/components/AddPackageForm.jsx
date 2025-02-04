'use client';
import ATJInput from '@/components/form/ATJInput';
import ATJMultiSelect from '@/components/form/ATJMultiSelect';
import {
	consultantFeaturesOptions,
	employerFeaturesOptions,
	packageNameOptions,
	packageTargetRoleOptions,
	talentFeaturesOptions,
} from '@/data/packageSelectData';
import {useEffect, useState} from 'react';
import {useForm, Controller, FormProvider, useFieldArray} from 'react-hook-form';

const AddPackageForm = () => {
	const [targetRole, setTargetRole] = useState('');
	const [initialOptions, setInitialOptions] = useState([]);

	useEffect(() => {
		const newOptions =
			targetRole === 'Talent'
				? talentFeaturesOptions
				: targetRole === 'Employer'
				? employerFeaturesOptions
				: consultantFeaturesOptions;

		setInitialOptions(newOptions);
	}, [targetRole]);

	const methods = useForm({
		defaultValues: {
			features: [],
		},
	});

	const {control, handleSubmit, setValue, watch} = methods;
	const {fields, append, remove} = useFieldArray({
		control,
		name: 'features',
	});

	const selectedFeatures = watch('features')?.map((item) => item.value) || [];

	// Get available options for a specific select field
	const getAvailableOptions = (currentValue) => {
		return initialOptions.filter(
			(option) => !selectedFeatures.includes(option.value) || option.value === currentValue,
		);
	};

	// Add new feature selection field
	const addField = () => {
		append({value: '', isEnabled: false});
	};

	// Submit form
	const onSubmit = (data) => {
		console.log('Form submitted:', data);
	};

	return (
		<div className="widget-content">
			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="default-form pt-4">
						<div className="row">
							<div className="form-group col-lg-6 col-md-12">
								<label>Package Name</label>
								<ATJMultiSelect
									label={'Package Name'}
									isMulti={false}
									name="name"
									options={packageNameOptions}
								/>
							</div>
							<div className="form-group col-lg-6 col-md-12">
								<label>Previous Price</label>
								<ATJInput type={'text'} label={'Previous Package Price'} name="previousPrice" />
							</div>

							<div className="form-group col-lg-6 col-md-12">
								<label>Discount Price</label>
								<ATJInput type={'text'} label={'Discount Package Price'} name="price" />
							</div>
							<div className="form-group col-lg-6 col-md-12">
								<label>Target Role</label>
								<ATJMultiSelect
									label={'Target Role'}
									isMulti={false}
									name="targetRole"
									options={packageTargetRoleOptions}
									onChange={(selectedOption) => {
										setTargetRole(selectedOption.value);
										setValue('features', []); // Reset features when target role changes
									}}
								/>
							</div>

							{/* Feature selection fields */}
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
															field.onChange(e.target.value);
														}}
													>
														<option value="" disabled>
															Select a Feature
														</option>
														{/* Exclude already selected features except for current field */}
														{getAvailableOptions(field.value).map((option) => (
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
														value={String(field.value)}
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
								{targetRole ? (
									<button
										type="button"
										onClick={addField}
										className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
									>
										Add Feature
										<i className="la la-plus ml-1"></i>
									</button>
								) : (
									<>
										<label className="text-red-500">
											NOTE: Please select a target role to add package features.
										</label>
										<button
											type="button"
											disabled={true}
											className="px-4 py-2 bg-gray-500 text-white rounded-md cursor-not-allowed"
										>
											Add Feature
										</button>
									</>
								)}
							</div>

							<div className="space-x-4 mt-6 mb-2">
								<button
									type="submit"
									className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 "
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
