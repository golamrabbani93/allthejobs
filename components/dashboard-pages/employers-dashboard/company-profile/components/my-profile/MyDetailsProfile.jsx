'use client';

import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import ATJSelect from '@/components/form/ATJSelect';
import Spinner from '@/components/Sppiner/Spinner';
import {useDispatch, useSelector} from 'react-redux';
import {GetCountries} from 'react-country-state-city';
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
	// default values
	const defaultValues = {
		company_name: userRoleBasedData?.company_name,
		company_website: userRoleBasedData?.company_website,
		designation: {label: userRoleBasedData?.designation, value: userRoleBasedData?.designation},
		department: userRoleBasedData?.department,
		website: userRoleBasedData?.website,
		country: userRoleBasedData?.country,
		city: userRoleBasedData?.city,
		area: userRoleBasedData?.area,
		about: userRoleBasedData?.about,
	};

	const handelProfileData = (data) => {
		const designation = data?.designation?.value;
		const payload = {
			...data,
			designation,
			user_id: userRoleBasedData?.user_id,
		};
		console.log(payload);
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
		dispatch(setUserRoleBasedData(data));
	}, [data]);

	const countryOptions = countries.map((country) => country.name);
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
							<label>Province</label>
							<ATJInput disabled={loading} type={'text'} label="Manitoba" name="area" />
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
