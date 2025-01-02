'use client';

import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import ATJSelect from '@/components/form/ATJSelect';
import Spinner from '@/components/Sppiner/Spinner';
import {useSelector} from 'react-redux';
import {GetCountries} from 'react-country-state-city';
import {useEffect, useState} from 'react';
import ATJMultiSelect from '@/components/form/ATJMultiSelect';
import {ageOptions, consultantServices, hiringManagerDesignations} from '@/data/formSelectData';
import {
	useGetEmployerQuery,
	useUpdateEmployerMutation,
} from '@/features/employer/employer.management.api';
import ATJTextArea from '@/components/form/ATJTextArea';
const MyDetailsProfile = () => {
	const user = useSelector((state) => state.user);
	const {data: employerData, isFetching} = useGetEmployerQuery(user.user_id);
	//update employer data
	const [updateEmployer, {isLoading}] = useUpdateEmployerMutation();
	const [countries, setCountries] = useState([]);
	// default values
	const defaultValues = {
		company_name: employerData?.company_name,
		company_website: employerData?.company_website,
		designation: {label: employerData?.designation, value: employerData?.designation},
		department: employerData?.department,
		website: employerData?.website,
		country: employerData?.country,
		city: employerData?.city,
		area: employerData?.area,
		about: employerData?.about,
	};

	const handelProfileData = (data) => {
		const designation = data?.designation?.value;
		const payload = {
			...data,
			designation,
			user_id: user.user_id,
		};
		updateEmployer({employerId: employerData?.employer_id, data: payload});
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
				defaultValues={employerData?.employer_id ? defaultValues : {}}
				// resolver={zodResolver(userProfileValidation)}
				onSubmit={handelProfileData}
			>
				<div className="default-form">
					<div className="row">
						<div className="form-group col-lg-6 col-md-12">
							<label>Company Name</label>
							<ATJInput
								disabled={isFetching}
								type={'text'}
								label="SPS Software"
								name="company_name"
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Company Website</label>
							<ATJInput
								disabled={isFetching}
								type={'text'}
								label="https://spssoftware.com"
								name="company_website"
							/>
						</div>

						<div className="form-group col-lg-6 col-md-12">
							<label>Designation</label>
							<ATJMultiSelect
								isDisabled={isFetching}
								isMulti={false}
								label="Executive Recruiter"
								name="designation"
								options={hiringManagerDesignations}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Department</label>
							<ATJInput disabled={isFetching} type={'text'} label="HR" name="department" />
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

						<div className="form-group col-lg-12 col-md-12">
							<label>About Your Company</label>
							<ATJTextArea disabled={isFetching} name="about" />
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
