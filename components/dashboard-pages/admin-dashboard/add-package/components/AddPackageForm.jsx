'use client';
import ATJInput from '@/components/form/ATJInput';
import ATJMultiSelect from '@/components/form/ATJMultiSelect';
import Spinner from '@/components/Sppiner/Spinner';
import {
	consultantFeaturesOptions,
	employerFeaturesOptions,
	packageNameOptions,
	packageTargetRoleOptions,
	talentFeaturesOptions,
} from '@/data/packageSelectData';
import {usePostPackageMutation} from '@/features/packages/packages.management.api';
import {useEffect, useState} from 'react';
import {useForm, Controller, FormProvider, useFieldArray} from 'react-hook-form';
import {toast} from 'react-toastify';

const AddPackageForm = () => {
	const [targetRole, setTargetRole] = useState('');
	const [initialOptions, setInitialOptions] = useState([]);

	//save package
	const [savePackage, {data, isLoading}] = usePostPackageMutation();
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

	const {control, handleSubmit, setValue, watch, reset} = methods;
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
		if (
			data.name === undefined ||
			data.price.length === 0 ||
			data.previousPrice.length === 0 ||
			data.targetRole === undefined
		) {
			toast.error('Please fill all the fields');
			return;
		}

		const payload = {
			name: data.name.value,
			description: 'description',
			duration_days: '1 Month',
			price: Number(data.price),
			previousPrice: Number(data.previousPrice),
			target_role: data.targetRole.value.toLowerCase(),
			features: data.features.map((feature) => ({
				name: feature.value,
				isEnabled: feature.isEnabled,
			})),
		};
		savePackage(payload);
	};
	useEffect(() => {
		if (data?.package_id) {
			reset();
		}
	}, [data]);
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
										className="px-2 btn btn-outline-danger  rounded-md  transition duration-200"
									>
										<i className="la la-trash-alt text-3xl"></i>
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
									<div className="flex ">
										<label className="text-red-500">
											NOTE: Please select a target role to add package features.
										</label>
									</div>
								)}
							</div>

							<div className="space-x-4 mt-6 mb-2">
								{isLoading ? (
									<button
										disabled={isLoading}
										type="submit"
										className="px-4 py-2 cursor-not-allowed  bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
									>
										<Spinner size="sm" color="white" />
									</button>
								) : (
									<button
										type="submit"
										className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
									>
										Save Package
										<i className="la la-save ml-1 text-2xl"></i>
									</button>
								)}
							</div>
						</div>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export default AddPackageForm;
