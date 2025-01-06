'use client';
import React, {useEffect, useState} from 'react';
import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import {useDispatch, useSelector} from 'react-redux';
import {
	useGetTalentQuery,
	useUpdateTalentMutation,
} from '@/features/candidate/talent.management.api';
import Spinner from '@/components/Sppiner/Spinner';
import {zodResolver} from '@hookform/resolvers/zod';
import {experienceValidationSchema} from '@/schemas/experience.schema';
import {useUpdateConsultantMutation} from '@/features/consultant/consultant.management.api';
import {setUserRoleBasedData} from '@/features/data/dataSlice';

const ExperienceDetails = () => {
	const dispatch = useDispatch();
	//get user
	const {userRoleBasedData, loading} = useSelector((state) => state.data);
	//update education details
	const [updateConsultant, {data, isLoading}] = useUpdateConsultantMutation();
	const [showForm, setShowForm] = useState(false); // State to control form visibility

	const handelProfileData = (data, e) => {
		const payload = {
			id: userRoleBasedData.experience_details.length + 1,
			role: data.role,
			companyName: data.companyName,
			duration: data.duration,
			description: data.description,
		};
		const newData = {
			experience_details:
				userRoleBasedData.experience_details.length > 0
					? [...userRoleBasedData.experience_details, payload]
					: [payload],
			user_id: userRoleBasedData.user_id,
			headline: userRoleBasedData.headline,
		};
		updateConsultant({consultantId: userRoleBasedData.consultant_id, data: newData});

		e.target.reset(); // Reset the form
	};

	//handle close form
	useEffect(() => {
		if (data?.consultant_id) {
			dispatch(setUserRoleBasedData(data));
			setShowForm(false);
		}
	}, [data]);

	const handleAddNewEducation = () => {
		// Show the form when button is clicked
		isLoading ? null : setShowForm(true);
	};

	return (
		<div>
			{/* //add new education details */}
			<div className="widget-content">
				{showForm ? (
					<button className="theme-btn btn-style-one mb-4" onClick={() => setShowForm(false)}>
						Cancel
					</button>
				) : (
					<button
						disabled={!userRoleBasedData?.consultant_id || loading || isLoading}
						className="theme-btn btn-style-one mb-4"
						onClick={handleAddNewEducation}
					>
						Add New Work Experience
					</button>
				)}
				{showForm && ( // Conditionally render the form
					<ATJForm
						// defaultValues={defaultValues}
						resolver={zodResolver(experienceValidationSchema)}
						onSubmit={handelProfileData}
					>
						<div className="default-form">
							<div className="row">
								<div className="form-group col-lg-6 col-md-12">
									<label>Role</label>
									<ATJInput disabled={loading} type={'text'} label="Sr UX Engineer" name="role" />
								</div>
								<div className="form-group col-lg-6 col-md-12">
									<label>Company Name Name</label>
									<ATJInput
										disabled={loading}
										type={'text'}
										label="Spotify Inc."
										name="companyName"
									/>
								</div>
								<div className="form-group col-lg-6 col-md-12">
									<label>Duration</label>
									<ATJInput disabled={loading} type={'text'} label="2012 - 2014" name="duration" />
								</div>
								<div className="form-group col-lg-6 col-md-12">
									<label>Description</label>
									<ATJInput
										disabled={loading}
										type={'text'}
										label="Tell us about your role"
										name="description"
									/>
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
				)}
				{/* Display saved education details */}
				<div className={`resume-outer theme-blue`}>
					{/* <!-- Start Resume BLock --> */}
					{userRoleBasedData?.experience_details?.map((item, i) => (
						<div className="resume-block" key={i}>
							<div className="inner">
								<span className="name">{item.companyName.slice(0, 1)}</span>
								<div className="title-box">
									<div className="info-box">
										<h3>{item.role}</h3>
										<span>{item.companyName}</span>
									</div>
									<div className="edit-box">
										<span className="year">{item.duration}</span>
									</div>
								</div>
								<div className="text">{item.description}</div>
							</div>
						</div>
					))}

					{/* <!-- End Resume BLock --> */}
				</div>
			</div>
		</div>
	);
};

export default ExperienceDetails;
