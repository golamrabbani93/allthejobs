import {z} from 'zod';

export const experienceValidationSchema = z.object({
	role: z.string().min(1, 'Role is required'),
	companyName: z.string().min(1, 'Company Name is required'),
	duration: z.string().min(1, 'Duration is required'),
	description: z.string().min(1, 'Description is required'),
});
