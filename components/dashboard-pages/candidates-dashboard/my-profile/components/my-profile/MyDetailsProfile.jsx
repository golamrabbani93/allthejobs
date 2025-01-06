'use client';

import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import ATJSelect from '@/components/form/ATJSelect';
import Spinner from '@/components/Sppiner/Spinner';
import {
	useGetTalentQuery,
	useUpdateTalentMutation,
} from '@/features/candidate/talent.management.api';
import {useDispatch, useSelector} from 'react-redux';
import {GetCountries} from 'react-country-state-city';
import {useEffect, useState} from 'react';
import ATJMultiSelect from '@/components/form/ATJMultiSelect';
import {
	ageOptions,
	educationOptions,
	experienceOptions,
	jobSkillsOptions,
	languageOptions,
} from '@/data/formSelectData';
import ATJTextArea from '@/components/form/ATJTextArea';
import {setUserRoleBasedData} from '@/features/data/dataSlice';
const MyDetailsProfile = () => {
	const dispatch = useDispatch();
	const {userRoleBasedData, loading} = useSelector((state) => state.data);
	const user = useSelector((state) => state.user);
	const [countries, setCountries] = useState([]);
	//get talent data
	const [updateTalent, {isLoading, data}] = useUpdateTalentMutation();

	// default values
	const defaultValues = {
		headline: userRoleBasedData?.headline,
		age: {label: userRoleBasedData?.age, value: userRoleBasedData?.age},
		education_level: {
			label: userRoleBasedData?.education_level,
			value: userRoleBasedData?.education_level,
		},
		experience: {label: userRoleBasedData?.experience, value: userRoleBasedData?.experience},
		skills: userRoleBasedData?.skills?.map((skill) => ({label: skill, value: skill})),
		website: userRoleBasedData?.website,
		country: userRoleBasedData?.country,
		city: userRoleBasedData?.city,
		area: userRoleBasedData?.area,
		gender: userRoleBasedData?.gender,
		dob: userRoleBasedData?.dob,
		current_salary: userRoleBasedData?.current_salary,
		expected_salary: userRoleBasedData?.expected_salary,
		about: userRoleBasedData?.about,
		language: userRoleBasedData?.language?.map((lang) => ({label: lang, value: lang})),
		open_to_work: {
			label: userRoleBasedData?.open_to_work ? 'Yes' : 'No',
			value: userRoleBasedData?.open_to_work,
		},
	};

	const handelProfileData = (data) => {
		const education_level = data.education_level.label;
		const experience = data.experience.value;
		const open_to_work = data.open_to_work.value;
		const skills = data.skills.map((skill) => skill.value);
		const language = data.language.map((lang) => lang.value);
		const age = data.age.value;
		const payload = {
			...data,
			education_level,
			experience,
			language,
			age,
			skills,
			user_id: user.user_id,
			open_to_work,
		};

		updateTalent({talentId: userRoleBasedData.talent_id, data: payload});
	};

	useEffect(() => {
		//get country list
		const fetchCountries = async () => {
			const countries = await GetCountries();
			setCountries(countries);
		};
		fetchCountries();

		//save fresh user details in store
		if (data?.talent_id) {
			dispatch(setUserRoleBasedData(data));
		}
	}, [data]);
	//make country options
	const countryOptions = countries.map((country) => country.name);
	return (
		<div className="widget-content">
			<ATJForm
				defaultValues={userRoleBasedData?.talent_id ? defaultValues : {}}
				// resolver={zodResolver(userProfileValidation)}
				onSubmit={handelProfileData}
			>
				<div className="default-form">
					<div className="row">
						<div className="form-group col-lg-6 col-md-12">
							<label>My Role</label>
							<ATJInput
								disabled={loading}
								type={'text'}
								label="Front-End Developer"
								name="headline"
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Education</label>
							<ATJMultiSelect
								isMulti={false}
								label="Education Level"
								isDisabled={loading}
								name="education_level"
								options={educationOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Experience</label>
							<ATJMultiSelect
								isMulti={false}
								label="Experience Level"
								isDisabled={loading}
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
							<label>Portfolio</label>
							<ATJInput disabled={loading} type={'text'} label="website" name="website" />
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
								isDisabled={loading}
								label="Age"
								name="age"
								isMulti={false}
								options={ageOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Date Of Birth</label>
							<ATJInput disabled={loading} type={'text'} label="19-06-1990" name="dob" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Languages</label>
							<ATJMultiSelect
								isDisabled={loading}
								label="Languages"
								name="language"
								options={languageOptions}
							/>
						</div>
						<div className="form-group col-lg-12 col-md-12">
							<label>Open To Work</label>
							<ATJMultiSelect
								isDisabled={loading}
								label="Open To Work"
								name="open_to_work"
								isMulti={false}
								options={[
									{value: true, label: 'Yes'},
									{value: false, label: 'No'},
								]}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Current Salary $</label>
							<ATJInput disabled={loading} type={'text'} label="$1000" name="current_salary" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Expected Salary $</label>
							<ATJInput disabled={loading} type={'text'} label="$1000" name="expected_salary" />
						</div>

						<div className="form-group col-lg-12 col-md-12">
							<label>Describe Yourself</label>
							<ATJTextArea disabled={loading} name="about" />
						</div>

						{/* //button */}
					</div>
					<div className="form-group col-lg-6 col-md-12">
						<button disabled={isLoading} type="submit" className="theme-btn btn-style-one">
							{isLoading ? <Spinner size="sm" color="white" /> : 'Save'}
						</button>
					</div>
				</div>
			</ATJForm>
		</div>
	);
};

export default MyDetailsProfile;
