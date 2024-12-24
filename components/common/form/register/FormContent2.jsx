import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import Spinner from '@/components/Sppiner/Spinner';
import {useRegister} from '@/hooks/auth/auth.hooks';
import {useCreateConsultant} from '@/hooks/consultants/consultants.hook';
import {useCreateEmployer} from '@/hooks/employers/employers.hook';
import {useCreateTalent} from '@/hooks/talents/talents.hook';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

const FormContent2 = ({userType}) => {
	// create user
	const {mutate: createUser, isPending, data: newUserData} = useRegister();
	//create Talent profile
	const {mutate: createTalent} = useCreateTalent();
	//create Employer profile
	const {mutate: createEmployer} = useCreateEmployer();
	//create consultant profile
	const {mutate: createConsultant} = useCreateConsultant();
	const router = useRouter();
	//Email sign up and saved data to database
	const onSubmit = (data) => {
		const userData = {
			...data,
			role: userType,
		};
		createUser(userData);
	};

	//after registration create role based profile
	useEffect(() => {
		//if user is talent then create talent profile
		if (newUserData !== undefined) {
			router.push('/login');
			if (newUserData?.role === 'talent') {
				const talentData = {
					user_id: newUserData.user_id,
				};
				createTalent(talentData);
			}
			//if user is employer then create employer profile
			if (newUserData?.role === 'employer') {
				const employerData = {
					user_id: newUserData.user_id,
				};
				createEmployer(employerData);
			}
			//if user is consultant then create consultant profile
			if (newUserData?.role === 'consultant') {
				const consultantData = {
					user_id: newUserData.user_id,
					headline: 'Consultant',
				};

				createConsultant(consultantData);
			}
		}
	}, [newUserData]);
	return (
		<ATJForm
			// defaultValues={loginData}
			// resolver={zodResolver(loginValidationSchema)}
			onSubmit={onSubmit}
		>
			{/* Name */}
			<div className="form-group">
				<label>Name :</label>
				<ATJInput label="Name" name="name" type="text" />
			</div>
			{/* User Name */}
			<div className="form-group">
				<label>User Name :</label>
				<ATJInput label="User Name" name="username" type="text" />
			</div>
			{/* Email Address */}
			<div className="form-group">
				<label>Email Address :</label>
				<ATJInput label="Email Address" name="email" type="email" />
			</div>
			{/* Password */}
			<div className="form-group">
				<label>Password :</label>
				<ATJInput label="Password" name="password" type="password" />
			</div>
			<div className="form-group">
				<button className="theme-btn btn-style-one" type="submit">
					{isPending ? <Spinner color="white" /> : 'Register'}
				</button>
			</div>
		</ATJForm>
	);
};

export default FormContent2;
