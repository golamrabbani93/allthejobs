'use client';

import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import Spinner from '@/components/Sppiner/Spinner';
import {setUserData} from '@/features/data/dataSlice';
import {useUpdateMyProfileMutation} from '@/features/user/user.management';
import {setUser} from '@/features/user/userSlice';
import {userProfileValidation} from '@/schemas/users/users.schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
const MyProfileForm = () => {
	const dispatch = useDispatch();
	const {userData, loading} = useSelector((state) => state.data);
	const [useUpdateMyProfile, {data, isLoading}] = useUpdateMyProfileMutation();

	const defaultValues = {
		name: userData?.name,
		username: userData?.username,
		email: userData?.email,
		phone: userData?.phone,
	};

	const handelProfileData = (data) => {
		const payload = {
			name: data?.name,
			username: data?.username,
			email: data?.email,
			phone: data?.phone,
			password_hash: userData?.password_hash,
			role: userData?.role,
		};

		useUpdateMyProfile(payload);
	};
	//set fresh user data after updating
	useEffect(() => {
		if (data?.user_id) {
			dispatch(setUserData(data));
			dispatch(setUser({...data, image: data.photo}));
		}
	}, [data]);

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
						<ATJInput disabled={loading} type={'text'} label="Jerome Arnold" name="name" />
					</div>
					{/* <!-- Input --> */}
					<div className="form-group col-lg-6 col-md-12">
						<label>User Name</label>
						<ATJInput disabled={loading} type={'text'} label="JeromeArnold" name="username" />
					</div>
					{/* <!-- Input --> */}
					<div className="form-group col-lg-6 col-md-12">
						<label>Email address</label>

						<ATJInput
							disabled={loading}
							type={'email'}
							label="jeromearnold@gmail.com"
							name="email"
						/>
					</div>
					{/* <!-- Input --> */}
					<div className="form-group col-lg-6 col-md-12">
						<label>Phone</label>
						<ATJInput disabled={loading} type={'text'} label="0 123 456 7890" name="phone" />
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
