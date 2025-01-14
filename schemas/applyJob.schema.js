import {z} from 'zod';

export const applyJobValidationSchema = z.object({
	feedback: z
		.string({
			message: 'Message is required',
		})
		.min(50, ' Message must be at least 50 characters long')
		.max(200, 'Message must be at most 500 characters long'),
});
