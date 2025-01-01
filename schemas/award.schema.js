import {z} from 'zod';

export const awardValidationSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	category: z.string().min(1, 'Award Category Name is required'),
	duration: z.string().min(1, 'Duration is required'),
	description: z.string().min(1, 'Description is required'),
});
