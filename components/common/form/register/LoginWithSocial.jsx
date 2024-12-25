'use client';
import {useUserRegisterMutation} from '@/features/auth/auth.management.api';
import {useCreateTalentMutation} from '@/features/candidate/talent.management.api';
import {useGetMyProfileQuery} from '@/features/user/user.management';
import {setUser} from '@/features/user/userSlice';
import hashPassword from '@/hooks/hashPassword/hashPassword.hook';
import {signIn, useSession} from 'next-auth/react';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

const LoginWithSocial = () => {
	const dispatch = useDispatch();
	const [createUser, {data: newUserData, isLoading}] = useUserRegisterMutation();
	const [createTalent] = useCreateTalentMutation();
	const {data: session, status} = useSession();
	const {data: myProfile, isFetching} = useGetMyProfileQuery(session?.user?.email);
	// create user
	useEffect(() => {
		const fetchAndCreateUser = async () => {
			if (status === 'authenticated') {
				const userData = {
					...session.user,
					role: 'talent',
				};
				dispatch(setUser(userData)); // Dispatch the user data to Redux

				// Check if myProfile is undefined and avoid fetching when already in progress
				if (myProfile === undefined && !isFetching) {
					try {
						const hashedPassword = await hashPassword(userData.email);
						// Assuming createUser is a function that takes the user data
						createUser({
							...userData,
							password_hash: hashedPassword,
							username: userData.email,
						});
					} catch (error) {
						console.error('Error creating user:', error);
					}
				}
			}
		};

		fetchAndCreateUser();
	}, [status, session, myProfile, isFetching, dispatch]);

	// after registration create role based profile
	useEffect(() => {
		//if user is talent then create talent profile
		if (newUserData !== undefined) {
			if (newUserData?.role === 'talent') {
				const talentData = {
					user_id: newUserData.user_id,
				};
				createTalent(talentData);
			}
		}
	}, [newUserData, isLoading]);
	return (
		<div className="btn-box row">
			<div className="col-lg-4 col-md-12">
				<button
					onClick={() => signIn('facebook')}
					className="theme-btn social-btn-two facebook-btn"
				>
					<i className="fab fa-facebook-f"></i> Facebook
				</button>
			</div>
			<div className="col-lg-4 col-md-12">
				<button
					onClick={() => signIn('google', {callbackUrl: '/dashboard/talent/dashboard'})}
					className="theme-btn social-btn-two google-btn"
				>
					<i className="fab fa-google"></i> Gmail
				</button>
			</div>
			<div className="col-lg-4 col-md-12">
				<button
					onClick={() => signIn('facebook')}
					className="theme-btn social-btn-two facebook-btn"
				>
					<i className="fab fa-linkedin-in"></i> Linkedin
				</button>
			</div>
		</div>
	);
};

export default LoginWithSocial;
