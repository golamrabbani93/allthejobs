import {z} from 'zod';

export const registerUserSchema = z
	.object({
		name: z.string().min(1, 'Name is required').max(50, 'Name cannot exceed 50 characters'),
		email: z.string().min(1, 'Email is required').email('Invalid email format'),
		username: z
			.string()
			.min(3, 'Username must be at least 3 characters')
			.max(20, 'Username cannot exceed 20 characters'),
		password: z
			.string()
			.min(6, 'Password must be at least 6 characters')
			.max(50, 'Password cannot exceed 50 characters'),
		// .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		// .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		// .regex(/[0-9]/, 'Password must contain at least one number'),
		confirm_password: z.string().min(6, 'Please confirm your password'),
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "The password doesn't match.",
		path: ['confirm_password'],
	});
