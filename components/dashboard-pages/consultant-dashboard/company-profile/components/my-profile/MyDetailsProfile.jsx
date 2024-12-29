'use client';

import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import ATJSelect from '@/components/form/ATJSelect';
import Spinner from '@/components/Sppiner/Spinner';
import {useSelector} from 'react-redux';
import {GetCountries} from 'react-country-state-city';
import {useEffect, useState} from 'react';
import ATJMultiSelect from '@/components/form/ATJMultiSelect';
import {
	ageOptions,
	consultantServices,
	educationOptions,
	experienceOptions,
} from '@/data/formSelectData';
import {
	useGetConsultantQuery,
	useUpdateConsultantMutation,
} from '@/features/consultant/consultant.management.api';
const MyDetailsProfile = () => {
	const user = useSelector((state) => state.user);
	const {data: consultantData, isFetching} = useGetConsultantQuery(user?.user_id);
	const [updateConsultant, {isLoading, data}] = useUpdateConsultantMutation();
	console.log('🚀🚀: MyDetailsProfile -> data', data);
	const [countries, setCountries] = useState([]);

	// default values
	// const defaultValues = {
	// 	headline: talentData?.headline,

	// 	education: {label: talentData?.education, value: talentData?.education},
	// 	experiences: {label: talentData?.experiences, value: talentData?.experiences},
	// 	skills: talentData?.skills.map((skill) => ({label: skill, value: skill})),
	// 	website: talentData?.website,
	// 	country: talentData?.country,
	// 	city: talentData?.city,
	// 	area: talentData?.area,
	// 	gender: talentData?.gender,
	// 	dob: talentData?.dob,
	// 	current_salary: talentData?.current_salary,
	// 	expected_salary: talentData?.expected_salary,
	// };

	const handelProfileData = (data) => {
		const age = data.age.value;
		const services = data?.services.map((services) => services.value);
		const payload = {
			...data,
			age,
			services,
			user_id: user.user_id,
		};
		updateConsultant({consultantId: consultantData?.consultant_id, data: payload});
	};

	//get country list
	useEffect(() => {
		const fetchCountries = async () => {
			const countries = await GetCountries();
			setCountries(countries);
		};

		fetchCountries();
	}, []);

	const countryOptions = countries.map((country) => country.name);
	return (
		<div className="widget-content">
			<ATJForm
				// defaultValues={defaultValues}
				// resolver={zodResolver(userProfileValidation)}
				onSubmit={handelProfileData}
			>
				<div className="default-form">
					<div className="row">
						<div className="form-group col-lg-6 col-md-12">
							<label>My Role</label>
							<ATJInput
								disabled={isFetching}
								type={'text'}
								label="HR Professional"
								name="headline"
							/>
						</div>

						<div className="form-group col-lg-6 col-md-12">
							<label>Services</label>
							<ATJMultiSelect
								isDisabled={isFetching}
								label="Services"
								name="services"
								options={consultantServices}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Hourly Rate</label>
							<ATJInput disabled={isFetching} type={'text'} label="$100" name="hourly_rate" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Portfolio</label>
							<ATJInput
								disabled={isFetching}
								type={'text'}
								label="https://dev-rabbani.web.app/"
								name="website"
							/>
						</div>

						<div className="form-group col-lg-6 col-md-12">
							<label>Country</label>

							<ATJSelect
								disabled={isFetching || countries.length === 0}
								options={countryOptions}
								name="country"
								label="Select Your Country"
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>City</label>
							<ATJInput disabled={isFetching} type={'text'} label="Saint John" name="city" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Area</label>
							<ATJInput disabled={isFetching} type={'text'} label="26 Near" name="area" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Gender</label>
							<ATJSelect
								disabled={isFetching}
								options={['Male', 'Female', 'Other']}
								name="gender"
								label="Select Your Gender"
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Age</label>

							<ATJMultiSelect
								isMulti={false}
								isDisabled={isFetching}
								label="Age"
								name="age"
								options={ageOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Date Of Birth</label>
							<ATJInput disabled={isFetching} type={'text'} label="19-06-1990" name="dob" />
						</div>

						{/* //button */}
						<div className="form-group col-lg-6 col-md-12">
							<button disabled={isLoading} type="submit" className="theme-btn btn-style-one">
								{isLoading ? <Spinner size="sm" color="white" /> : 'Save'}
							</button>
						</div>
					</div>
				</div>
			</ATJForm>
		</div>
	);
};

export default MyDetailsProfile;
