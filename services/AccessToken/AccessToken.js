'use server';
import jwt from 'jsonwebtoken';
import {cookies} from 'next/headers';
import {jwtDecode} from 'jwt-decode';
import {fetchUserInformation} from '../GenerateAllData';
// set Token in Cookies
export const setToken = (userData) => {
	const payload = {
		user_id: userData.user_id,
		role: userData.role,
		email: userData.email,
	};
	const secretKey = process.env.JWT_SECRET;
	const options = {expiresIn: '30d'};
	const token = jwt.sign(payload, secretKey, options);
	if (token) {
		cookies().set('accessToken', token, {
			httpOnly: true, // Prevents JavaScript access
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 30, //30 days
		});
	}
};

//get currentUser by cookies

export const getCurrentUser = async () => {
	//get token from cookies
	const accessToken = cookies().get('accessToken')?.value;
	let decodedToken = null;
	if (accessToken) {
		//decode token
		const currentTime = Math.floor(Date.now() / 1000);
		const decoded = await jwtDecode(accessToken);
		//check if token has expired
		if (decoded.exp && decoded.exp < currentTime) {
			console.log('Token has expired');
			return null;
		}
		//fetch user information
		const userInformation = await fetchUserInformation(decoded.email);
		if (userInformation.role === decoded.role) {
			decodedToken = userInformation;
		}
	}
	return decodedToken;
};
// remove token from cookies
export const removeToken = () => {
	cookies().delete('accessToken');
};
