import {signOut} from 'next-auth/react';
import {clearUser} from '@/features/user/userSlice';
import {useRouter} from 'next/navigation';
import {useDispatch} from 'react-redux';
import {setUserData, setUserRoleBasedData} from '@/features/data/dataSlice';
import {removeToken} from '@/services/AccessToken/AccessToken';

const LogOutButton = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const userLogOut = async () => {
		router.push('/');
		await signOut({redirect: false});
		dispatch(clearUser());
		dispatch(setUserData({}));
		dispatch(setUserRoleBasedData({}));
		await removeToken();
	};

	return (
		<li className={`mb-1 loglist`}>
			<button onClick={() => userLogOut()} className="avatarButton">
				<i className={`la la-sign-out logicon`}></i> Log Out
			</button>
		</li>
	);
};

export default LogOutButton;
