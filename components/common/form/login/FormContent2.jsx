'use client';
import Link from 'next/link';
import LoginWithSocial from '../register/LoginWithSocial';
import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import {useLogin} from '@/hooks/auth/auth.hooks';
import Spinner from '@/components/Sppiner/Spinner';
import {redirect, useRouter} from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const FormContent2 = () => {
	const {mutate, isPending, data} = useLogin();
	const onSubmit = (data) => {
		mutate(data);
	};
	const router = useRouter();
	const {data:session,status}=useSession()
	useEffect(() => {
			if (status === "authenticated") {
				router.push("/");
			}
		}, [status, session, router]);
	
		if (status === "loading") {
			//just keeping like this for the time being
			return <Spinner color="white" /> 
		}
	return (
		<div className="form-inner">
			<h3>Create a Free Allthejobs Account</h3>

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
					<ATJInput label="Password" name="password" type="password" />
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
						{isPending ? <Spinner color="white" /> : 'Login'}
					</button>
				</div>
			</ATJForm>
			{/* End form */}

			<div className="bottom-box">
				<div className="text">
					Don&apos;t have an account? <Link href="/register">Signup</Link>
				</div>

				<div className="divider">
					<span>or</span>
				</div>

				<LoginWithSocial />
			</div>
			{/* End bottom-box LoginWithSocial */}
		</div>
	);
};

export default FormContent2;
