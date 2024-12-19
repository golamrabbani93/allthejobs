import {login, registerJobSeeker} from '@/services/AuthService';
import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {toast} from 'react-toastify';
// import bcrypt from 'bcrypt';  // ES module syntax
import bcrypt from 'bcryptjs';
import {useDispatch} from 'react-redux';
import {setUser} from '@/features/user/userSlice';
import {closeModal} from '@/components/common/form/login/FormContent2';

async function hashPassword(plainPassword) {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
	return hashedPassword;
}
async function comparePassword(enteredPassword, storedHash) {
	const isMatch = await bcrypt.compare(enteredPassword, storedHash);
	return isMatch;
}
export const useRegister = () => {
	const router = useRouter();

	return useMutation({
		mutationKey: ['JOB_SEEKER_REGISTRATION'],
		mutationFn: async (userData) => {
			const password_hash = await hashPassword(userData.password);
			const response = await registerJobSeeker({...userData, password_hash});
			return response;
		},
		onSuccess: (data) => {
			if (data.user_id) {
				toast.success('Registration Successful');
				closeModal();
				router.push('/login');
			}
		},
		onError: (_error) => {
			// console.log(_error);
			console.log('Register Failed.... something went wrong');
		},
	});
};

export const useLogin = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	return useMutation({
		mutationKey: ['LOGIN'],
		mutationFn: async (userData) => {
			const data = await login();
			const user = data.find((user) => user.email === userData.email);
			console.log(user);
			// return response;
			const isMatch = await comparePassword(userData.password, user.password_hash);
			if (isMatch) {
				const userData = {
					name: user.name,
					email: user.email,
					image: 'https://cdn-icons-png.flaticon.com/512/3541/3541871.png',
					role: user.role,
				};
				dispatch(setUser(userData));
				toast.success('Login Successful');
				closeModal();
				router.push(`dashboard/${user.role}/dashboard`);
				return data;
			} else {
				toast.error('Login Failed');
			}
		},
		onError: (_error) => {
			toast.error('Login Failed');
		},
	});
};
