'use client';
import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import ATJMultiSelect from '@/components/form/ATJMultiSelect';
import ATJTextArea from '@/components/form/ATJTextArea';
import Spinner from '@/components/Sppiner/Spinner';
import {experienceOptions, jobSkillsOptions, languageOptions} from '@/data/formSelectData';
import {
	benefits,
	educationRequirements,
	industries,
	jobLocationTypes,
	jobTagsOptions,
	jobTypes,
	responsibilities,
	salaryRanges,
} from '@/data/jobPosting';

const PostJobs = () => {
	const loading = false;
	const isLoading = false;
	//handle Jobs Post
	const handleJobPost = (data) => {
		console.log(data);
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
			<ATJForm onSubmit={handleJobPost}>
				<div className="default-form">
					<div className="row">
						<div className="form-group col-lg-6 col-md-12">
							<label>Job Title</label>
							<ATJInput disabled={loading} type={'text'} label="Marketing Manager" name="title" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Vacancy</label>
							<ATJInput disabled={loading} type={'text'} label="3" name="vacancy_count" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Job BeneFits</label>
							<ATJMultiSelect
								label={'Benefits'}
								name={'benefits'}
								disabled={loading}
								options={benefitsOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Job Responsibilities</label>
							<ATJMultiSelect
								label={'Responsibilities'}
								name={'responsibilities'}
								disabled={loading}
								options={responsibilitiesOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Education Requirements</label>
							<ATJMultiSelect
								isMulti={false}
								label={'Education Requirements'}
								name={'education_requirements'}
								disabled={loading}
								options={educationRequirementsOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Languages</label>
							<ATJMultiSelect
								label={'Languages'}
								name={'language_requirements'}
								disabled={loading}
								options={languageOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Industries</label>
							<ATJMultiSelect
								label={'Industries'}
								isMulti={false}
								name={'industries'}
								disabled={loading}
								options={industryOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Skills Required</label>
							<ATJMultiSelect
								label={'Skills'}
								name={'skills_required'}
								disabled={loading}
								options={jobSkillsOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Salary Ranges</label>
							<ATJMultiSelect
								label={'Salary Ranges'}
								name={'salary_range'}
								isMulti={false}
								disabled={loading}
								options={salaryRanges}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Job Type</label>
							<ATJMultiSelect
								label={'Job Type'}
								name={'job_type'}
								isMulti={false}
								disabled={loading}
								options={jobTypes}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Experience Required</label>
							<ATJMultiSelect
								label={'Experience Level'}
								name={'experience_level'}
								isMulti={false}
								disabled={loading}
								options={experienceOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Location Type</label>
							<ATJMultiSelect
								label={'Location Type'}
								name={'location_type'}
								isMulti={false}
								disabled={loading}
								options={jobLocationTypes}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Tags: Select Top 3 Tags</label>
							<ATJMultiSelect
								label={'Top 3 Tagse'}
								name={'tags'}
								disabled={loading}
								options={jobTagsOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Show this jobs on the homepage?</label>
							<ATJMultiSelect
								isDisabled={loading}
								label="Featured"
								name="featured"
								isMulti={false}
								options={[
									{value: true, label: 'Yes'},
									{value: false, label: 'No'},
								]}
							/>
						</div>

						<div className="form-group col-lg-6 col-md-12">
							<label>Application Instruction</label>
							<ATJTextArea disabled={loading} name="application_instruction" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Job Description</label>
							<ATJTextArea disabled={loading} name="description" />
						</div>

						<div className="form-group col-lg-6 col-md-12">
							<button disabled={isLoading} type="submit" className="theme-btn btn-style-one">
								{isLoading ? <Spinner size="sm" color="white" /> : 'Post Job'}
							</button>
						</div>
					</div>
				</div>
			</ATJForm>
		</div>
	);
};

export default PostJobs;
