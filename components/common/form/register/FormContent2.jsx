import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import Spinner from '@/components/Sppiner/Spinner';
import {useRegister} from '@/hooks/auth/auth.hooks';

const FormContent2 = ({userType}) => {
	const {mutate, isPending, data} = useRegister();
	console.log('🚀🚀: data', data);
	const onSubmit = (data) => {
		const userData = {
			...data,
			role: userType,
		};
		mutate(userData);
	};
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
