'use client';
import React, {useEffect, useState} from 'react';
import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import {useSelector} from 'react-redux';
import {
	useGetTalentQuery,
	useUpdateTalentMutation,
} from '@/features/candidate/talent.management.api';
import Spinner from '@/components/Sppiner/Spinner';
import {zodResolver} from '@hookform/resolvers/zod';
import {experienceValidationSchema} from '@/schemas/experience.schema';

const ExperienceDetails = () => {
	//get user
	const user = useSelector((state) => state.user);
	console.log('🚀🚀: ExperienceDetails -> user', user);

	//get talent profile
	const {data: talentData, isFetching} = useGetTalentQuery(user.user_id);
	//update education details
	const [updateTalent, {data, isLoading}] = useUpdateTalentMutation();
	const [showForm, setShowForm] = useState(false); // State to control form visibility

	const handelProfileData = (data, e) => {
		const payload = {
			id: talentData.experience_details.length + 1,
			role: data.role,
			companyName: data.companyName,
			duration: data.duration,
			description: data.description,
		};
		const newData = {
			experience_details:
				talentData.experience_details.length > 0
					? [...talentData.experience_details, payload]
					: [payload],
			user_id: talentData.user_id,
		};
		updateTalent({talentId: talentData.talent_id, data: newData});

		e.target.reset(); // Reset the form
	};

	//handle close form
	useEffect(() => {
		if (data?.talent_id) {
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
						disabled={!talentData?.talent_id || isFetching || isLoading}
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
									<ATJInput
										disabled={isFetching}
										type={'text'}
										label="Sr UX Engineer"
										name="role"
									/>
								</div>
								<div className="form-group col-lg-6 col-md-12">
									<label>Company Name Name</label>
									<ATJInput
										disabled={isFetching}
										type={'text'}
										label="Spotify Inc."
										name="companyName"
									/>
								</div>
								<div className="form-group col-lg-6 col-md-12">
									<label>Duration</label>
									<ATJInput
										disabled={isFetching}
										type={'text'}
										label="2012 - 2014"
										name="duration"
									/>
								</div>
								<div className="form-group col-lg-6 col-md-12">
									<label>Description</label>
									<ATJInput
										disabled={isFetching}
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
					{talentData?.experience_details?.map((item, i) => (
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
