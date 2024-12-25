'use client';

import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import Spinner from '@/components/Sppiner/Spinner';
import {useGetMyProfileQuery, useUpdateMyProfileMutation} from '@/features/user/user.management';
import {userProfileValidation} from '@/schemas/users/users.schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useSelector} from 'react-redux';
const MyProfileForm = () => {
	const user = useSelector((state) => state.user);

	const {data: myProfileData, isFetching} = useGetMyProfileQuery(user.email);
	const [useUpdateMyProfile, {isLoading}] = useUpdateMyProfileMutation();

	const defaultValues = {
		name: myProfileData?.name,
		username: myProfileData?.username,
		email: myProfileData?.email,
		phone: myProfileData?.phone,
	};

	const handelProfileData = (data) => {
		const updatedData = {...myProfileData, ...data};
		useUpdateMyProfile(updatedData);
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
						<ATJInput disabled={isFetching} type={'text'} label="Jerome Arnold" name="name" />
					</div>
					{/* <!-- Input --> */}
					<div className="form-group col-lg-6 col-md-12">
						<label>User Name</label>
						<ATJInput disabled={isFetching} type={'text'} label="JeromeArnold" name="username" />
					</div>
					{/* <!-- Input --> */}
					<div className="form-group col-lg-6 col-md-12">
						<label>Email address</label>

						<ATJInput disabled={true} type={'email'} label="jeromearnold@gmail.com" name="email" />
					</div>
					{/* <!-- Input --> */}
					<div className="form-group col-lg-6 col-md-12">
						<label>Phone</label>
						<ATJInput disabled={isFetching} type={'text'} label="0 123 456 7890" name="phone" />
					</div>
					{/* <!-- Input --> */}
					<div className="form-group col-lg-6 col-md-12">
						<button disabled={isLoading} type="submit" className="theme-btn btn-style-one">
							{isLoading ? <Spinner size="sm" color="white" /> : 'Save'}
						</button>
					</div>
				</div>
			</div>
		</ATJForm>
	);
};

export default MyProfileForm;
