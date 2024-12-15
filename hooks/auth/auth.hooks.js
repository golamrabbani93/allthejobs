import {login, registerJobSeeker} from '@/services/AuthService';
import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {toast} from 'react-toastify';

export const useRegisterJobSeeker = () => {
	const router = useRouter();

	return useMutation({
		mutationKey: ['JOB_SEEKER_REGISTRATION'],
		mutationFn: async (userData) => {
			const response = await registerJobSeeker(userData);
			return response;
		},
		onSuccess: (data) => {
			if (data.id) {
				toast.success('Registration Successful');
				router.push('/login');
			} else {
			}
		},
		onError: (_error) => {
			console.log('Register Failed....');
		},
	});
};

export const useLogin = () => {
	const router = useRouter();

	return useMutation({
		mutationKey: ['LOGIN'],
		mutationFn: async (userData) => {
			const data = await login();
			const user = data.find(
				(user) => user.email === userData.email && user.password === userData.password,
			);
			// return response;
			if (user.email === userData.email && user.password === userData.password) {
				toast.success('Login Successful');
				router.push('/');
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
