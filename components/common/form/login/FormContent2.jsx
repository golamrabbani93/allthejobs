'use client';
import Link from 'next/link';
import LoginWithSocial from '../register/LoginWithSocial';
import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import Spinner from '@/components/Sppiner/Spinner';
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import {setUser} from '@/features/user/userSlice';
import {useDispatch} from 'react-redux';
import {useUserLoginMutation} from '@/features/auth/auth.management.api';
import {setToken} from '@/services/AccessToken/AccessToken';

export const closeModal = () => {
	const modalTrigger = document.getElementById('modalClose');
	if (modalTrigger) {
		modalTrigger.click();
	}
};
export const closeModalRegister = () => {
	const modalTrigger = document.getElementById('modalClose2');
	if (modalTrigger) {
		modalTrigger.click();
	}
};

const FormContent2 = ({modal = false, userType}) => {
	// show password
	const [showPassword, setShowPassword] = useState(false);
	const [makeLogin, {data: userResponseData, isLoading}] = useUserLoginMutation();
	const dispatch = useDispatch();
	const router = useRouter();
	const {status} = useSession();
	const onSubmit = (data) => {
		// mutate(data);
		makeLogin(data);
	};
	//save userInfo in local Storage
	useEffect(() => {
		const saveUserData = () => {
			if (userResponseData?.user_id) {
				const userData = {
					user_id: userResponseData.user_id,
					name: userResponseData.name,
					email: userResponseData.email,
					image:
						userResponseData.photo ||
						'https://res.cloudinary.com/dolttvkme/image/upload/v1739084572/custom-avatar_llfgxl.png',
					role: userResponseData.role,
				};
				router.push(`dashboard/${userResponseData.role}`);
				setToken(userResponseData);
				dispatch(setUser(userData));
			}
		};
		saveUserData();
	}, [userResponseData?.user_id, isLoading]);

	if (status === 'loading') {
		//just keeping like this for the time being
		return <Spinner color="white" />;
	}
	return (
		<div className="form-inner">
			{/* <!--Login Form--> */}
			<ATJForm
				// defaultValues={loginData}
				// resolver={zodResolver(loginValidationSchema)}
				onSubmit={onSubmit}
			>
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
					<div className="field-outer">
						<div className="input-group checkboxes square">
							<input type="checkbox" name="remember-me" id="remember" />
							<label htmlFor="remember" className="remember">
								<span className="custom-checkbox"></span> Remember me
							</label>
						</div>
						<a href="#" className="pwd">
							Forgot password?
						</a>
					</div>
				</div>
				{/* forgot password */}
				<div className="form-group">
					<button className="theme-btn btn-style-one" type="submit">
						{isLoading ? <Spinner color="white" /> : 'Login'}
					</button>
				</div>
			</ATJForm>
			{/* End form */}

			<div className="bottom-box">
				{modal ? (
					<div className="text">
						Don&apos;t have an account?{' '}
						<Link
							href="#"
							className="call-modal signup"
							data-bs-toggle="modal"
							data-bs-target="#registerModal"
						>
							Signup
						</Link>
					</div>
				) : (
					<div className="text">
						Don&apos;t have an account? <Link href="/register">Signup</Link>
					</div>
				)}

				{userType === 'talent' && (
					<>
						<div className="divider">
							<span>or</span>
						</div>
						<LoginWithSocial />
					</>
				)}
			</div>
			{/* End bottom-box LoginWithSocial */}
		</div>
	);
};

export default FormContent2;
