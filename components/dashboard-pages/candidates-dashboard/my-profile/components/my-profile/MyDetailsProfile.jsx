'use client';

import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import ATJSelect from '@/components/form/ATJSelect';
import Spinner from '@/components/Sppiner/Spinner';
import {
	useGetTalentQuery,
	useUpdateTalentMutation,
} from '@/features/candidate/talent.management.api';
import {useSelector} from 'react-redux';
import {GetCountries} from 'react-country-state-city';
import {useEffect, useState} from 'react';
import ATJMultiSelect from '@/components/form/ATJMultiSelect';
const MyDetailsProfile = () => {
	const user = useSelector((state) => state.user);
	const [countries, setCountries] = useState([]);
	//get talent data
	const {data: talentData, isFetching} = useGetTalentQuery(user.user_id);
	const [updateTalent, {isLoading, data}] = useUpdateTalentMutation();

	// default values
	const defaultValues = {
		headline: talentData?.headline,

		education: {label: talentData?.education, value: talentData?.education},
		experiences: {label: talentData?.experiences, value: talentData?.experiences},
		skills: talentData?.skills.map((skill) => ({label: skill, value: skill})),
		website: talentData?.website,
		country: talentData?.country,
		city: talentData?.city,
		area: talentData?.area,
		gender: talentData?.gender,
		dob: talentData?.dob,
		current_salary: talentData?.current_salary,
		expected_salary: talentData?.expected_salary,
	};

	const handelProfileData = (data) => {
		const education = data.education.label;
		const experiences = data.experiences.value;
		const skills = data.skills.map((skill) => skill.value);
		const payload = {
			...data,
			education,
			experiences,
			skills,
			user_id: user.user_id,
		};
		updateTalent({talentId: talentData.talent_id, data: payload});
	};

	const jobSkills = [
		// **Technical Skills**
		{label: 'JavaScript', value: 'javascript'},
		{label: 'React.js', value: 'react.js'},
		{label: 'Node.js', value: 'node.js'},
		{label: 'TypeScript', value: 'typescript'},
		{label: 'Python', value: 'python'},
		{label: 'Ruby on Rails', value: 'ruby_on_rails'},
		{label: 'Java', value: 'java'},
		{label: 'C++', value: 'c++'},
		{label: 'C#', value: 'c#'},
		{label: 'PHP', value: 'php'},
		{label: 'HTML/CSS', value: 'html_css'},
		{label: 'SQL', value: 'sql'},
		{label: 'MongoDB', value: 'mongodb'},
		{label: 'MySQL', value: 'mysql'},
		{label: 'PostgreSQL', value: 'postgresql'},
		{label: 'Redis', value: 'redis'},
		{label: 'GraphQL', value: 'graphql'},
		{label: 'AWS', value: 'aws'},
		{label: 'Google Cloud', value: 'google_cloud'},
		{label: 'Microsoft Azure', value: 'microsoft_azure'},
		{label: 'Docker', value: 'docker'},
		{label: 'Kubernetes', value: 'kubernetes'},
		{label: 'DevOps', value: 'devops'},
		{label: 'Git/GitHub', value: 'git_github'},
		{label: 'Terraform', value: 'terraform'},
		{label: 'Jenkins', value: 'jenkins'},
		{label: 'CI/CD', value: 'ci_cd'},
		{label: 'Apache Kafka', value: 'apache_kafka'},
		{label: 'Nginx', value: 'nginx'},
		{label: 'Linux', value: 'linux'},
		{label: 'Windows Server', value: 'windows_server'},
		{label: 'MacOS', value: 'macos'},
		{label: 'Shell Scripting', value: 'shell_scripting'},
		{label: 'Vagrant', value: 'vagrant'},
		{label: 'Ansible', value: 'ansible'},
		{label: 'Puppet', value: 'puppet'},
		{label: 'Machine Learning', value: 'machine_learning'},
		{label: 'Data Science', value: 'data_science'},
		{label: 'Deep Learning', value: 'deep_learning'},
		{label: 'Natural Language Processing', value: 'nlp'},
		{label: 'TensorFlow', value: 'tensorflow'},
		{label: 'PyTorch', value: 'pytorch'},
		{label: 'OpenCV', value: 'opencv'},
		{label: 'Big Data', value: 'big_data'},
		{label: 'Hadoop', value: 'hadoop'},
		{label: 'Spark', value: 'spark'},
		{label: 'Cloud Computing', value: 'cloud_computing'},
		{label: 'Blockchain', value: 'blockchain'},
		{label: 'IoT (Internet of Things)', value: 'iot'},
		{label: 'Cybersecurity', value: 'cybersecurity'},
		{label: 'Ethical Hacking', value: 'ethical_hacking'},
		{label: 'Penetration Testing', value: 'penetration_testing'},
		{label: 'Network Security', value: 'network_security'},
		{label: 'AWS Security', value: 'aws_security'},
		{label: 'DevSecOps', value: 'devsecops'},
		{label: 'UI/UX Design', value: 'ui_ux_design'},
		{label: 'Figma', value: 'figma'},
		{label: 'Adobe XD', value: 'adobe_xd'},
		{label: 'Sketch', value: 'sketch'},
		{label: 'InVision', value: 'invision'},
		{label: 'Wireframing', value: 'wireframing'},
		{label: 'Prototyping', value: 'prototyping'},
		{label: 'Web Development', value: 'web_development'},
		{label: 'Mobile App Development', value: 'mobile_app_development'},
		{label: 'React Native', value: 'react_native'},
		{label: 'Flutter', value: 'flutter'},
		{label: 'Swift', value: 'swift'},
		{label: 'Kotlin', value: 'kotlin'},
		{label: 'Android Development', value: 'android_development'},
		{label: 'iOS Development', value: 'ios_development'},
		{label: 'Game Development', value: 'game_development'},
		{label: 'Unity', value: 'unity'},
		{label: 'Unreal Engine', value: 'unreal_engine'},
		{label: 'Augmented Reality (AR)', value: 'ar'},
		{label: 'Virtual Reality (VR)', value: 'vr'},
		{label: 'API Development', value: 'api_development'},
		{label: 'API Integration', value: 'api_integration'},
		{label: 'OAuth', value: 'oauth'},
		{label: 'RESTful APIs', value: 'restful_apis'},
		{label: 'SOAP', value: 'soap'},
		// **Non-Technical Skills**
		{label: 'Communication', value: 'communication'},
		{label: 'Leadership', value: 'leadership'},
		{label: 'Teamwork', value: 'teamwork'},
		{label: 'Problem Solving', value: 'problem_solving'},
		{label: 'Time Management', value: 'time_management'},
		{label: 'Project Management', value: 'project_management'},
		{label: 'Agile', value: 'agile'},
		{label: 'Scrum', value: 'scrum'},
		{label: 'Kanban', value: 'kanban'},
		{label: 'Business Analysis', value: 'business_analysis'},
		{label: 'Product Management', value: 'product_management'},
		{label: 'Sales', value: 'sales'},
		{label: 'Negotiation', value: 'negotiation'},
		{label: 'Customer Service', value: 'customer_service'},
		{label: 'Account Management', value: 'account_management'},
		{label: 'Marketing Strategy', value: 'marketing_strategy'},
		{label: 'Content Creation', value: 'content_creation'},
		{label: 'SEO', value: 'seo'},
		{label: 'Digital Marketing', value: 'digital_marketing'},
		{label: 'Social Media Marketing', value: 'social_media_marketing'},
		{label: 'PPC Advertising', value: 'ppc_advertising'},
		{label: 'Email Marketing', value: 'email_marketing'},
		{label: 'Copywriting', value: 'copywriting'},
		{label: 'Public Relations', value: 'public_relations'},
		{label: 'Event Planning', value: 'event_planning'},
		{label: 'Business Development', value: 'business_development'},
		{label: 'Finance', value: 'finance'},
		{label: 'Accounting', value: 'accounting'},
		{label: 'Data Analysis', value: 'data_analysis'},
		{label: 'Financial Modeling', value: 'financial_modeling'},
		{label: 'Market Research', value: 'market_research'},
		{label: 'Market Analysis', value: 'market_analysis'},
		{label: 'Supply Chain Management', value: 'supply_chain_management'},
		{label: 'Logistics', value: 'logistics'},
		{label: 'Procurement', value: 'procurement'},
		{label: 'HR', value: 'hr'},
		{label: 'Recruitment', value: 'recruitment'},
		{label: 'Talent Acquisition', value: 'talent_acquisition'},
		{label: 'Employee Relations', value: 'employee_relations'},
		{label: 'Organizational Development', value: 'organizational_development'},
		{label: 'Training and Development', value: 'training_and_development'},
		{label: 'Conflict Resolution', value: 'conflict_resolution'},
		{label: 'Risk Management', value: 'risk_management'},
	];
	const educationOptions = [
		{value: 'no_formal_education', label: 'No Formal Education'},
		{value: 'high_school', label: 'High School'},
		{value: 'ged', label: 'GED (General Education Development)'},
		{value: 'vocational_training', label: 'Vocational Training'},
		{value: 'associate', label: 'Associate Degree'},
		{value: 'bachelor', label: 'Bachelor’s Degree'},
		{value: 'graduate_certificate', label: 'Graduate Certificate'},
		{value: 'postgraduate_diploma', label: 'Postgraduate Diploma'},
		{value: 'master', label: 'Master’s Degree'},
		{value: 'professional_degree', label: 'Professional Degree (e.g., MD, JD, MBA)'},
		{value: 'phd', label: 'PhD (Doctor of Philosophy)'},
		{value: 'post_doc', label: 'Post-Doctoral Studies'},
		{value: 'trade_school', label: 'Trade School'},
		{value: 'certificate_program', label: 'Certificate Program'},
		{value: 'technical_certification', label: 'Technical Certification (e.g., IT, Cloud)'},
		{value: 'diploma', label: 'Diploma'},
		{value: 'other', label: 'Other'},
	];
	const experienceOptions = [
		{value: 'No Experience', label: 'No Experience'},
		{value: 'Less than 1 Year', label: 'Less than 1 Year'},
		{value: '1-2 Years', label: '1-2 Years'},
		{value: '3-5 Years', label: '3-5 Years'},
		{value: '6-9 Years', label: '6-9 Years'},
		{value: '10-14 Years', label: '10-14 Years'},
		{value: '15-19 Years', label: '15-19 Years'},
		{value: '20+ Years', label: '20+ Years'},
	];

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
				defaultValues={talentData?.talent_id ? defaultValues : {}}
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
							<ATJMultiSelect
								isMulti={false}
								label="Education"
								isDisabled={isFetching}
								name="education"
								options={educationOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Experience</label>
							<ATJMultiSelect
								isMulti={false}
								label="Experiences"
								isDisabled={isFetching}
								name="experiences"
								options={experienceOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Skills</label>
							<ATJMultiSelect
								isDisabled={isFetching}
								label="Skills"
								name="skills"
								options={jobSkills}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Portfolio</label>
							<ATJInput disabled={isFetching} type={'text'} label="website" name="website" />
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
						<div className="form-group col-lg-6 col-md-12">
							<label>Gender</label>
							<ATJSelect
								disabled={isFetching}
								options={['Male', 'Female', 'Other']}
								name="gender"
								label="Select Your Gender"
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Date Of Birth</label>
							<ATJInput disabled={isFetching} type={'text'} label="19-06-1990" name="dob" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Current Salary $</label>
							<ATJInput disabled={isFetching} type={'text'} label="$1000" name="current_salary" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Expected Salary $</label>
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
