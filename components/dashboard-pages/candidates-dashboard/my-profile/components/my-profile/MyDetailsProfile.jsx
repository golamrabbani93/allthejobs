'use client';

import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import {useGetTalentQuery} from '@/features/candidate/talent.management.api';
import {useSelector} from 'react-redux';

const MyDetailsProfile = () => {
	const user = useSelector((state) => state.user);
	console.log('🚀🚀: MyDetailsProfile -> user', user);
	//get talent data
	const {data: talentData, isFetching} = useGetTalentQuery(user.user_id);
	console.log('🚀🚀: MyDetailsProfile -> talentData', talentData);
	// const isFetching = false;
	const isLoading = false;
	const handelProfileData = (data) => {
		console.log(data);
	};
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
								label="Front-End Developer"
								name="headline"
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Education</label>
							<ATJInput disabled={isFetching} type={'text'} label="Education" name="education" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Experience</label>
							<ATJInput disabled={isFetching} type={'text'} label="Experience" name="experiences" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Skills</label>
							<ATJInput disabled={isFetching} type={'text'} label="Skills" name="skills" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Portfolio</label>
							<ATJInput disabled={isFetching} type={'text'} label="website" name="website" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>LinkedIn Profile</label>
							<ATJInput
								disabled={isFetching}
								type={'text'}
								label="LinkedIn Profile"
								name="linkedin"
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Facebook Profile</label>
							<ATJInput
								disabled={isFetching}
								type={'text'}
								label="Facebook Profile"
								name="facebook"
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Country</label>
							<ATJInput disabled={isFetching} type={'text'} label="Canada" name="country" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>City</label>
							<ATJInput disabled={isFetching} type={'text'} label="Saint John" name="city" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Area</label>
							<ATJInput disabled={isFetching} type={'text'} label="26 Near" name="city" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Gender</label>
							<ATJInput disabled={isFetching} type={'text'} label="Male" name="gender" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Date Of Birth</label>
							<ATJInput disabled={isFetching} type={'text'} label="19-06-1990" name="city" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Current Salary</label>
							<ATJInput disabled={isFetching} type={'text'} label="$1000" name="current_salary" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Expected Salary</label>
							<ATJInput disabled={isFetching} type={'text'} label="$1000" name="expected_salary" />
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
