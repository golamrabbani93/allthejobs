import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import Spinner from '@/components/Sppiner/Spinner';
import {useUserRegisterMutation} from '@/features/auth/auth.management.api';
import {useCreateTalentMutation} from '@/features/candidate/talent.management.api';
import {useCreateConsultantMutation} from '@/features/consultant/consultant.management.api';
import {useCreateEmployerMutation} from '@/features/employer/employer.management.api';
import hashPassword from '@/hooks/hashPassword/hashPassword.hook';
import {registerUserSchema} from '@/schemas/register/register.schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect, useState} from 'react';

const FormContent = ({userType}) => {
	// show password
	const [showPassword, setShowPassword] = useState(false);
	// create user
	const [createUser, {isLoading, data: newUserData}] = useUserRegisterMutation();
	//create Talent profile
	const [createTalent] = useCreateTalentMutation();
	//create Employer profile
	const [createEmployer] = useCreateEmployerMutation();
	//create consultant profile
	const [createConsultant] = useCreateConsultantMutation();
	//Email sign up and saved data to database
	const onSubmit = async (data) => {
		const hashedPassword = await hashPassword(data.password);
		const userData = {
			name: data.name,
			username: data.username,
			email: data.email,
			password_hash: hashedPassword,
			role: userType,
		};
		createUser(userData);
	};

	//after registration create role based profile
	useEffect(() => {
		//if user is talent then create talent profile
		if (newUserData !== undefined) {
			//open login popup after registration
			const modalTrigger = document.getElementById('loginPopupButton');
			if (modalTrigger) {
				modalTrigger.click();
			}
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
			resolver={zodResolver(registerUserSchema)}
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
				<div className="relative">
					<ATJInput label="Password" name="password" type={showPassword ? 'text' : 'password'} />
					{showPassword ? (
						<i
							onClick={() => setShowPassword(!showPassword)}
							className="la la-eye-slash absolute top-[25px] right-[25px] cursor-pointer"
						></i>
					) : (
						<i
							onClick={() => setShowPassword(!showPassword)}
							className="la la-eye absolute top-[25px] right-[25px] cursor-pointer"
						></i>
					)}
				</div>
			</div>

			<div className="form-group">
				<label>Confirm Password :</label>
				<div className="relative">
					<ATJInput
						label="Confirm Password"
						name="confirm_password"
						type={showPassword ? 'text' : 'password'}
					/>

					{showPassword ? (
						<i
							onClick={() => setShowPassword(!showPassword)}
							className="la la-eye-slash absolute top-[25px] right-[25px] cursor-pointer"
						></i>
					) : (
						<i
							onClick={() => setShowPassword(!showPassword)}
							className="la la-eye absolute top-[25px] right-[25px] cursor-pointer"
						></i>
					)}
				</div>
			</div>

			<div className="form-group">
				<button className="theme-btn btn-style-one" type="submit">
					{isLoading ? <Spinner color="white" /> : 'Register'}
				</button>
			</div>
		</ATJForm>
	);
};

export default FormContent;
