'use client';

import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import ATJSelect from '@/components/form/ATJSelect';
import Spinner from '@/components/Sppiner/Spinner';
import {useDispatch, useSelector} from 'react-redux';
import {GetCity, GetCountries, GetState} from 'react-country-state-city';
import {useEffect, useState} from 'react';
import ATJMultiSelect from '@/components/form/ATJMultiSelect';
import {ageOptions, hiringManagerDesignations} from '@/data/formSelectData';
import {useUpdateEmployerMutation} from '@/features/employer/employer.management.api';
import ATJTextArea from '@/components/form/ATJTextArea';
import {setUserRoleBasedData} from '@/features/data/dataSlice';
const MyDetailsProfile = () => {
	const dispatch = useDispatch();
	const {userRoleBasedData, loading} = useSelector((state) => state.data);
	//update employer data
	const [updateEmployer, {data, isLoading}] = useUpdateEmployerMutation();
	const [countries, setCountries] = useState([]);
	const [countryData, setCountryData] = useState(null);
	const [provinces, setProvinces] = useState(null);
	const [provinceData, setProvinceData] = useState(null);
	const [cities, setCities] = useState(null);
	const [cityData, setCityData] = useState(null);
	// default values
	const [defaultValues, setDefaultValues] = useState();
	useEffect(() => {
		if (userRoleBasedData?.employer_id) {
			setDefaultValues({
				company_name: userRoleBasedData?.company_name,
				company_website: userRoleBasedData?.company_website,
				designation: {label: userRoleBasedData?.designation, value: userRoleBasedData?.designation},
				department: userRoleBasedData?.department,
				website: userRoleBasedData?.website,
				country: {label: userRoleBasedData?.country, value: userRoleBasedData?.country},
				province: {label: userRoleBasedData?.province, value: userRoleBasedData?.province},
				city: {label: userRoleBasedData?.city, value: userRoleBasedData?.city},
				about: userRoleBasedData?.about,
			});
		}
	}, [userRoleBasedData]);

	const handelProfileData = (data) => {
		const designation = data?.designation?.value;
		const country = data?.country?.value;
		const province = data?.province?.value;
		const city = data?.city?.value;

		const payload = {
			...data,
			designation,
			country,
			province,
			city,
			user_id: userRoleBasedData?.user_id,
		};
		updateEmployer({employerId: userRoleBasedData?.employer_id, data: payload});
	};

	//get country list
	useEffect(() => {
		const fetchCountries = async () => {
			const countries = await GetCountries();
			setCountries(countries);
		};
		fetchCountries();

		// set fresh user data
		if (data?.employerId) {
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
	// make country options
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
				defaultValues={userRoleBasedData?.employer_id ? defaultValues : {}}
				// resolver={zodResolver(userProfileValidation)}
				onSubmit={handelProfileData}
			>
				<div className="default-form">
					<div className="row">
						<div className="form-group col-lg-6 col-md-12">
							<label>Company Name</label>
							<ATJInput disabled={loading} type={'text'} label="SPS Software" name="company_name" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Company Website</label>
							<ATJInput
								disabled={loading}
								type={'text'}
								label="https://spssoftware.com"
								name="company_website"
							/>
						</div>

						<div className="form-group col-lg-6 col-md-12">
							<label>Designation</label>
							<ATJMultiSelect
								isDisabled={loading}
								isMulti={false}
								label="Executive Recruiter"
								name="designation"
								options={hiringManagerDesignations}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Department</label>
							<ATJInput disabled={loading} type={'text'} label="HR" name="department" />
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

						<div className="form-group col-lg-12 col-md-12">
							<label>About Your Company</label>
							<ATJTextArea disabled={loading} name="about" />
						</div>
					</div>
					{/* //button */}
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
