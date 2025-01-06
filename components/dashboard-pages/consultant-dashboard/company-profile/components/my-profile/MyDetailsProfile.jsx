'use client';

import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import ATJSelect from '@/components/form/ATJSelect';
import Spinner from '@/components/Sppiner/Spinner';
import {useDispatch, useSelector} from 'react-redux';
import {GetCountries} from 'react-country-state-city';
import {useEffect, useState} from 'react';
import ATJMultiSelect from '@/components/form/ATJMultiSelect';
import {
	ageOptions,
	consultantServices,
	educationOptions,
	experienceOptions,
	jobSkillsOptions,
	languageOptions,
} from '@/data/formSelectData';
import {
	useGetConsultantQuery,
	useUpdateConsultantMutation,
} from '@/features/consultant/consultant.management.api';
import ATJTextArea from '@/components/form/ATJTextArea';
import {setUserRoleBasedData} from '@/features/data/dataSlice';
const MyDetailsProfile = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const {userRoleBasedData, loading} = useSelector((state) => state.data);
	const [updateConsultant, {isLoading, data}] = useUpdateConsultantMutation();
	const [countries, setCountries] = useState([]);

	// default values
	const defaultValues = {
		headline: userRoleBasedData?.headline,

		education_level: {
			label: userRoleBasedData?.education_level,
			value: userRoleBasedData?.education_level,
		},
		experience: {label: userRoleBasedData?.experience, value: userRoleBasedData?.experience},
		services: userRoleBasedData?.services?.map((service) => ({label: service, value: service})),
		skills: userRoleBasedData?.skills?.map((skill) => ({label: skill, value: skill})),
		language: userRoleBasedData?.language?.map((lang) => ({label: lang, value: lang})),
		website: userRoleBasedData?.website,
		country: userRoleBasedData?.country,
		city: userRoleBasedData?.city,
		area: userRoleBasedData?.area,
		gender: userRoleBasedData?.gender,
		dob: userRoleBasedData?.dob,
		age: {label: userRoleBasedData?.age, value: userRoleBasedData?.age},
		hourly_rate: userRoleBasedData?.hourly_rate,
		about: userRoleBasedData?.about,
	};

	const handelProfileData = (data) => {
		const age = data.age.value;
		const services = data?.services.map((services) => services.value);
		const skills = data?.skills.map((skill) => skill.value);
		const education_level = data?.education_level.value;
		const experience = data?.experience.value;
		const language = data?.language.map((lang) => lang.value);
		const payload = {
			...data,
			age,
			services,
			skills,
			language,
			education_level,
			experience,
			user_id: user.user_id,
		};
		updateConsultant({consultantId: userRoleBasedData?.consultant_id, data: payload});
	};

	//get country list
	useEffect(() => {
		const fetchCountries = async () => {
			const countries = await GetCountries();
			setCountries(countries);
		};
		fetchCountries();
		//save fresh user details in store
		if (data?.consultant_id) {
			dispatch(setUserRoleBasedData(data));
		}
	}, [data]);

	const countryOptions = countries.map((country) => country.name);
	return (
		<div className="widget-content">
			<ATJForm
				defaultValues={userRoleBasedData?.consultant_id ? defaultValues : {}}
				// resolver={zodResolver(userProfileValidation)}
				onSubmit={handelProfileData}
			>
				<div className="default-form">
					<div className="row">
						<div className="form-group col-lg-6 col-md-12">
							<label>My Role</label>
							<ATJInput disabled={loading} type={'text'} label="HR Professional" name="headline" />
						</div>

						<div className="form-group col-lg-6 col-md-12">
							<label>Services</label>
							<ATJMultiSelect
								isDisabled={loading}
								label="Services"
								name="services"
								options={consultantServices}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Education</label>
							<ATJMultiSelect
								isDisabled={loading}
								isMulti={false}
								label="Education"
								name="education_level"
								options={educationOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Experience</label>
							<ATJMultiSelect
								isDisabled={loading}
								isMulti={false}
								label="Experience"
								name="experience"
								options={experienceOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Skills</label>
							<ATJMultiSelect
								isDisabled={loading}
								label="Skills"
								name="skills"
								options={jobSkillsOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Hourly Rate</label>
							<ATJInput disabled={loading} type={'text'} label="$100" name="hourly_rate" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Portfolio</label>
							<ATJInput
								disabled={loading}
								type={'text'}
								label="https://dev-rabbani.web.app/"
								name="website"
							/>
						</div>

						<div className="form-group col-lg-6 col-md-12">
							<label>Country</label>
							<ATJSelect
								disabled={loading || countries.length === 0}
								options={countryOptions}
								name="country"
								label="Select Your Country"
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>City</label>
							<ATJInput disabled={loading} type={'text'} label="Saint John" name="city" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Area</label>
							<ATJInput disabled={loading} type={'text'} label="26 Near" name="area" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Gender</label>
							<ATJSelect
								disabled={loading}
								options={['Male', 'Female', 'Other']}
								name="gender"
								label="Select Your Gender"
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Age</label>
							<ATJMultiSelect
								isMulti={false}
								isDisabled={loading}
								label="Age"
								name="age"
								options={ageOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Date Of Birth</label>
							<ATJInput disabled={loading} type={'text'} label="19-06-1990" name="dob" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Language</label>
							<ATJMultiSelect
								isDisabled={loading}
								label="Language"
								name="language"
								options={languageOptions}
							/>
						</div>
						<div className="form-group col-lg-12 col-md-12">
							<label>Language</label>
							<ATJTextArea isDisabled={loading} name="about" />
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
