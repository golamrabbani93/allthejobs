'use client';

import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import {useGetMyProfile} from '@/hooks/users/users.hook';
import {userProfileValidation} from '@/schemas/users/users.schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useSelector} from 'react-redux';
const MyProfileForm = () => {
	const user = useSelector((state) => state.user);

	const {data, isPending} = useGetMyProfile(user.email);
	const defaultValues = {
		name: data?.name,
		username: data?.username,
		email: data?.email,
		phone: data?.phone,
	};
	const handelProfileData = (data) => {
		console.log('Profile Data', data);
	};
	return (
		<ATJForm
			defaultValues={defaultValues}
			resolver={zodResolver(userProfileValidation)}
			onSubmit={handelProfileData}
		>
			<div className="default-form">
				<div className="row">
					{/* <!-- Input --> */}
					<div className="form-group col-lg-6 col-md-12">
						<label>Full Name</label>
						<ATJInput disabled={isPending} type={'text'} label="Jerome Arnold" name="name" />
					</div>
					{/* <!-- Input --> */}
					<div className="form-group col-lg-6 col-md-12">
						<label>User Name</label>
						<ATJInput disabled={isPending} type={'text'} label="JeromeArnold" name="username" />
					</div>
					{/* <!-- Input --> */}
					<div className="form-group col-lg-6 col-md-12">
						<label>Email address</label>

						<ATJInput disabled={true} type={'email'} label="jeromearnold@gmail.com" name="email" />
					</div>
					{/* <!-- Input --> */}
					<div className="form-group col-lg-6 col-md-12">
						<label>Phone</label>
						<ATJInput disabled={isPending} type={'text'} label="0 123 456 7890" name="phone" />
					</div>
					{/* <!-- Input --> */}
					<div className="form-group col-lg-6 col-md-12">
						<button type="submit" className="theme-btn btn-style-one">
							Save
						</button>
					</div>
				</div>
			</div>
		</ATJForm>
	);
};

export default MyProfileForm;
