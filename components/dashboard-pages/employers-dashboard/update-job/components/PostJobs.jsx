'use client';
import ATJDatePicker from '@/components/form/ATJDatePicker';
import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import ATJMultiSelect from '@/components/form/ATJMultiSelect';
import ATJTextArea from '@/components/form/ATJTextArea';
import Spinner from '@/components/Sppiner/Spinner';
import {jobSkillsOptions, languageOptions} from '@/data/formSelectData';
import {
	benefits,
	educationRequirements,
	industries,
	jobLocationTypes,
	JobsExperienceOptions,
	jobTagsOptions,
	jobTypes,
	responsibilities,
	salaryRanges,
} from '@/data/jobPosting';
import {
	useGetSingleJobQuery,
	usePostJobsMutation,
	useUpdateJobsMutation,
} from '@/features/job/job.management.api';
import {postJobsSchema} from '@/schemas/postJobs.schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {format, isMatch} from 'date-fns';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

const PostJobs = ({id}) => {
	//get id from the router
	const router = useRouter();
	//get jobs Data from the database
	const {data: jobData, isFetching} = useGetSingleJobQuery(id);
	//update jobs
	const [updateJobs, {data, isLoading}] = useUpdateJobsMutation();
	const [defaultValues, setDefaultValues] = useState({});

	// set default values
	useEffect(() => {
		if (jobData?.job_id) {
			setDefaultValues({
				title: jobData?.title || '',
				vacancy_count: jobData?.vacancy_count || '',
				benefits: jobData?.benefits.map((benefit) => ({label: benefit, value: benefit})),
				responsibilities: jobData?.responsibilities.map((responsibility) => ({
					label: responsibility,
					value: responsibility,
				})),
				education_requirements: {
					label: jobData?.education_requirements,
					value: jobData?.education_requirements,
				},
				industry: {label: jobData?.industry, value: jobData?.industry},
				language_requirements: jobData?.language_requirements.map((language) => ({
					label: language,
					value: language,
				})),
				skills_required: jobData
					? jobData.skills_required.map((skill) => ({label: skill, value: skill}))
					: [],
				salary_range: {label: jobData?.salary_range, value: jobData?.salary_range},
				job_type: {label: jobData?.job_type, value: jobData?.job_type},
				experience_level: {label: jobData?.experience_level, value: jobData?.experience_level},
				location_type: {label: jobData?.location_type, value: jobData?.location_type},
				tags: jobData ? jobData.tags.map((tag) => ({label: tag, value: tag})) : [],
				featured: {label: jobData?.featured ? 'Yes' : 'No', value: jobData?.featured},
				application_instruction: jobData?.application_instruction || '',
				description: jobData?.description || '',
				ap_deadline: jobData?.ap_deadline || '',
			});
		}
		if (data?.job_id) {
			router.push('/dashboard/employer/manage-jobs');
		}
	}, [jobData, id, data]);
	//handle Jobs Post
	const handleJobPost = (data) => {
		//check date format and convert to the correct format
		const formattedDate =
			typeof data.ap_deadline === 'string' && isMatch(data.ap_deadline, 'dd MMMM yyyy')
				? data.ap_deadline
				: format(new Date(data.ap_deadline), 'dd MMMM yyyy');

		const payload = {
			...data,
			benefits: data.benefits?.map((benefit) => benefit.value),
			responsibilities: data.responsibilities?.map((responsibility) => responsibility.value),
			education_requirements: data.education_requirements?.value,
			industry: data.industry?.value,
			language_requirements: data.language_requirements?.map((language) => language?.value),
			skills_required: data.skills_required?.map((skill) => skill?.value),
			salary_range: data.salary_range?.value,
			job_type: data.job_type?.value,
			experience_level: data.experience_level?.value,
			location_type: data.location_type?.value,
			tags: data.tags?.map((tag) => tag?.value),
			employer_id: jobData.employer_id,
			featured: data.featured?.value,
			is_open: true,
			status: 'Published',
			ap_deadline: formattedDate,
			job_id: jobData.job_id,
		};
		updateJobs(payload);
	};

	//convert benefits array to object
	const benefitsOptions = benefits.map((benefit) => {
		return {label: benefit, value: benefit};
	});

	//convert responsibilities array to object
	const responsibilitiesOptions = responsibilities.map((responsibility) => {
		return {label: responsibility, value: responsibility};
	});

	// convert educationRequirements array to object
	const educationRequirementsOptions = educationRequirements.map((educationRequirement) => {
		return {label: educationRequirement, value: educationRequirement};
	});

	//convert industry array to object
	const industryOptions = industries.map((industry) => {
		return {label: industry, value: industry};
	});
	return (
		<div className="widget-content">
			<ATJForm onSubmit={handleJobPost} defaultValues={defaultValues}>
				<div className="default-form">
					<div className="row">
						<div className="form-group col-lg-6 col-md-12">
							<label>Job Title</label>
							<ATJInput
								disabled={isFetching || isLoading}
								type={'text'}
								label="Marketing Manager"
								name="title"
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Vacancy</label>
							<ATJInput
								disabled={isFetching || isLoading}
								type={'text'}
								label="3"
								name="vacancy_count"
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Job BeneFits</label>
							<ATJMultiSelect
								label={'Benefits'}
								name={'benefits'}
								disabled={isFetching || isLoading}
								options={benefitsOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Job Responsibilities</label>
							<ATJMultiSelect
								label={'Responsibilities'}
								name={'responsibilities'}
								disabled={isFetching || isLoading}
								options={responsibilitiesOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Education Requirements</label>
							<ATJMultiSelect
								isMulti={false}
								label={'Education Requirements'}
								name={'education_requirements'}
								disabled={isFetching || isLoading}
								options={educationRequirementsOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Languages</label>
							<ATJMultiSelect
								label={'Languages'}
								name={'language_requirements'}
								disabled={isFetching || isLoading}
								options={languageOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Industry</label>
							<ATJMultiSelect
								label={'Industry'}
								isMulti={false}
								name={'industry'}
								disabled={isFetching || isLoading}
								options={industryOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Select Application Deadline Date</label>
							<ATJDatePicker
								disabled={isFetching || isLoading}
								name="ap_deadline"
								format="dd MMMM yyyy"
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Salary Ranges</label>
							<ATJMultiSelect
								label={'Salary Ranges'}
								name={'salary_range'}
								isMulti={false}
								disabled={isFetching || isLoading}
								options={salaryRanges}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Job Type</label>
							<ATJMultiSelect
								label={'Job Type'}
								name={'job_type'}
								isMulti={false}
								disabled={isFetching || isLoading}
								options={jobTypes}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Experience Required</label>
							<ATJMultiSelect
								label={'Experience Level'}
								name={'experience_level'}
								isMulti={false}
								disabled={isFetching || isLoading}
								options={JobsExperienceOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Location Type</label>
							<ATJMultiSelect
								label={'Location Type'}
								name={'location_type'}
								isMulti={false}
								disabled={isFetching || isLoading}
								options={jobLocationTypes}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Tags: Select Top 3 Tags</label>
							<ATJMultiSelect
								label={'Top 3 Tagse'}
								name={'tags'}
								disabled={isFetching || isLoading}
								options={jobTagsOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Show this jobs on the homepage?</label>
							<ATJMultiSelect
								isdisabled={isFetching || isLoading}
								label="Featured"
								name="featured"
								isMulti={false}
								options={[
									{value: true, label: 'Yes'},
									{value: false, label: 'No'},
								]}
							/>
						</div>
						<div className="form-group col-lg-12 col-md-12">
							<label>Skills Required</label>
							<ATJMultiSelect
								label={'Skills'}
								name={'skills_required'}
								disabled={isFetching || isLoading}
								options={jobSkillsOptions}
							/>
						</div>

						<div className="form-group col-lg-6 col-md-12">
							<label>Application Instruction</label>
							<ATJTextArea disabled={isFetching || isLoading} name="application_instruction" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Job Description</label>
							<ATJTextArea disabled={isFetching || isLoading} name="description" />
						</div>

						<div className="form-group col-lg-6 col-md-12">
							<button
								disabled={isFetching || isLoading}
								type="submit"
								className="theme-btn btn-style-one"
							>
								{isFetching || isLoading ? <Spinner size="sm" color="white" /> : 'Post Job'}
							</button>
						</div>
					</div>
				</div>
			</ATJForm>
		</div>
	);
};

export default PostJobs;
