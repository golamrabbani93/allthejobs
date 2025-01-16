'use client';

import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import ATJSelect from '@/components/form/ATJSelect';
import Spinner from '@/components/Sppiner/Spinner';
import {useDispatch, useSelector} from 'react-redux';
import {GetCity, GetCountries, GetState} from 'react-country-state-city';
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
	const [countryData, setCountryData] = useState(null);
	const [provinces, setProvinces] = useState(null);
	const [provinceData, setProvinceData] = useState(null);
	const [cities, setCities] = useState(null);
	const [cityData, setCityData] = useState(null);

	// default values
	const [defaultValues, setDefaultValues] = useState();
	useEffect(() => {
		if (userRoleBasedData?.consultant_id) {
			setDefaultValues({
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
				country: {label: userRoleBasedData?.country, value: userRoleBasedData?.country},
				province: {label: userRoleBasedData?.province, value: userRoleBasedData?.province},
				city: {label: userRoleBasedData?.city, value: userRoleBasedData?.city},
				gender: userRoleBasedData?.gender,
				dob: userRoleBasedData?.dob,
				age: {label: userRoleBasedData?.age, value: userRoleBasedData?.age},
				hourly_rate: userRoleBasedData?.hourly_rate,
				about: userRoleBasedData?.about,
			});
		}
	}, [userRoleBasedData]);

	const handelProfileData = (data) => {
		const age = data.age.value;
		const services = data?.services.map((services) => services.value);
		const skills = data?.skills.map((skill) => skill.value);
		const education_level = data?.education_level.value;
		const experience = data?.experience.value;
		const language = data?.language.map((lang) => lang.value);
		const country = data?.country.value;
		const province = data?.province.value;
		const city = data?.city.value;
		const payload = {
			...data,
			age,
			services,
			skills,
			language,
			education_level,
			experience,
			user_id: user.user_id,
			country,
			province,
			city,
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
		// get province list
		const fetchStates = async () => {
			const province = await GetState(countryData?.id);
			setProvinces(province);
		};
		fetchStates();
		//get city list
		const fetchCity = async () => {
			const city = await GetCity(countryData?.id, provinceData?.id);
			setCities(city);
		};
		fetchCity();
	}, [data, countryData, countryData?.id, provinceData, provinceData?.id]);

	const countryOptions = countries.map((country) => {
		return {label: country.name, value: country.name};
	});
	//make province options
	const provinceOptions = provinces?.map((province) => {
		return {label: province.name, value: province.name};
	});
	//make city options
	const cityOptions = cities?.map((city) => {
		return {label: city.name, value: city.name};
	});
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
							<label>Portfolio (optional)</label>
							<ATJInput
								disabled={loading}
								type={'text'}
								label="https://dev-rabbani.web.app/"
								name="website"
							/>
						</div>

						<div className="form-group col-lg-6 col-md-12">
							<label>Select Country</label>
							<ATJMultiSelect
								isMulti={false}
								label="Country"
								isDisabled={loading || countries.length === 0}
								name="country"
								options={countryOptions || ''}
								onChange={(e) => {
									const country = countries.find((c) => c.name === e.value);
									setCountryData(country);
									setDefaultValues({...defaultValues, country: {label: e.value, value: e.value}});
								}}
							/>
						</div>

						<div className="form-group col-lg-6 col-md-12">
							<label>Select Province</label>
							<ATJMultiSelect
								isMulti={false}
								label="Province"
								isDisabled={loading || countryData?.id === undefined}
								name="province"
								options={provinceOptions || []}
								onChange={(e) => {
									const province = provinces.find((p) => p.name === e.value);
									setProvinceData(province);
									setDefaultValues({...defaultValues, province: {label: e.value, value: e.value}});
								}}
							/>
						</div>

						<div className="form-group col-lg-6 col-md-12">
							<label>Select City</label>
							<ATJMultiSelect
								isMulti={false}
								label="City"
								isDisabled={loading || provinceData?.id === undefined}
								name="city"
								options={cityOptions || []}
								onChange={(e) => {
									const city = cities.find((c) => c.name === e.value);
									setCityData(city);
									setDefaultValues({...defaultValues, city: {label: e.value, value: e.value}});
								}}
							/>
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
							<label>Describe Yourself</label>
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
