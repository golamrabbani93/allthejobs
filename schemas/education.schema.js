import {z} from 'zod';

export const educationValidationSchema = z.object({
	institutionName: z.string().min(1, 'Institution Name is required'),
	degreeName: z.string().min(1, 'Degree Name is required'),
	duration: z.string().min(1, 'Duration is required'),
	description: z.string().min(1, 'Description is required'),
});
