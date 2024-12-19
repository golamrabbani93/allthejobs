import {signOut} from 'next-auth/react';
import {clearUser} from '@/features/user/userSlice';
import {useRouter} from 'next/navigation';
import {useDispatch} from 'react-redux';

const LogOutButton = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const userLogOut = async () => {
		await signOut({redirect: false});
		dispatch(clearUser());
		router.push('/');
	};

	return (
		<li className={`mb-1`}>
			<button onClick={() => userLogOut()} className="avatarButton">
				<i className={`la la-sign-out`}></i> Log Out
			</button>
		</li>
	);
};

export default LogOutButton;
