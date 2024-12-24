'use client';
import {setUser} from '@/features/user/userSlice';
import {useRegister} from '@/hooks/auth/auth.hooks';
import {useCreateTalent} from '@/hooks/talents/talents.hook';
import {useGetMyProfile} from '@/hooks/users/users.hook';
import {signIn, useSession} from 'next-auth/react';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

const LoginWithSocial = () => {
	const dispatch = useDispatch();
	const {mutate: createUser, data: newUserData} = useRegister();
	const {mutate: createTalent} = useCreateTalent();
	const {data: session, status} = useSession();
	const {data: myProfile, isPending} = useGetMyProfile(session?.user?.email);
	//social sign up and saved data to database
	useEffect(() => {
		if (status === 'authenticated') {
			const userData = {
				...session.user,
				role: 'talent',
			};
			dispatch(setUser(userData));
			if (myProfile === undefined && !isPending) {
				createUser({...userData, password: userData.email, username: userData.email});
			}
		}
	}, [status, session, myProfile, isPending]);

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
	}, [newUserData]);
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
