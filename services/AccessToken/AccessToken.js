'use server';
import jwt from 'jsonwebtoken';
import {cookies} from 'next/headers';

// set Token in Cookies
export const setToken = (userData) => {
	const payload = {
		user_id: userData.user_id,
		role: userData.role,
		email: userData.email,
	};
	const secretKey = process.env.JWT_SECRET;
	const options = {expiresIn: '1d'};
	const token = jwt.sign(payload, secretKey, options);
	if (token) {
		cookies().set('accessToken', token);
	}
};

//get currentUser by cookies
export const getCurrentUser = () => {};
