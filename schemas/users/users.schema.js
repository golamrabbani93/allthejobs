import {z} from 'zod';

export const userProfileValidation = z.object({
	name: z
		.string()
		.min(1, 'Name is required')
		.max(50, 'Name cannot exceed 50 characters')
		.regex(/^[a-zA-Z\s]+$/, 'Please enter a valid name!'),
	username: z
		.string()
		.min(1, 'Username is required')
		.max(30, 'Username cannot exceed 30 characters'),
	email: z.string().email('Please enter a valid email address!'),
	phone: z
		.string()
		.min(10, 'Phone must be at least 10 digits')
		.max(15, 'Phone cannot exceed 15 digits')
		.regex(/^\d+$/, 'Phone must contain only numbers'),
});
