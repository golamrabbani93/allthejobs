const {z} = require('zod');
const selectSchema = z
	.object({
		label: z.string().min(1, 'Label is required'),
		value: z.string().min(1, 'Value is required'),
	})
	.strict();
export const postJobsSchema = z.object({
	application_instruction: z
		.string({
			message: 'Application instruction is required',
		})
		.min(1, 'Application instruction is required')
		.max(200, 'Description is too long (max 200 characters)'),
	benefits: z
		.array(selectSchema)
		.min(1, {message: 'At least one benefit is required'})
		.optional()
		.refine((val) => val !== undefined, {
			message: 'At least one benefit is required',
		}),
	description: z
		.string({
			message: 'Description is required',
		})
		.min(1, 'Description is required')
		.max(200, 'Description is too long (max 200 characters)'),

	education_requirements: selectSchema.optional().refine((val) => val !== undefined, {
		message: 'Education Requirements is required',
	}),
	experience_level: selectSchema.optional().refine((val) => val !== undefined, {
		message: 'Experience level is required',
	}),
	industry: selectSchema.optional().refine((val) => val !== undefined, {
		message: 'Industry is required',
	}),
	job_type: selectSchema.optional().refine((val) => val !== undefined, {
		message: 'Job type is required',
	}),
	language_requirements: z
		.array(selectSchema)
		.min(1, {message: 'At least one language is required'})
		.optional()
		.refine((val) => val !== undefined, {
			message: 'At least one language is required',
		}),
	location_type: selectSchema.optional().refine((val) => val !== undefined, {
		message: 'Location type is required',
	}),
	responsibilities: z
		.array(selectSchema)
		.min(1, {message: 'At least one responsibilities is required'})
		.optional()
		.refine((val) => val !== undefined, {
			message: 'At least one responsibilities is required',
		}),
	salary_range: selectSchema.optional().refine((val) => val !== undefined, {
		message: 'Salary range is required',
	}),
	skills_required: z
		.array(selectSchema)
		.min(5, {message: 'At least 5 Skill is required'})
		.max(10, {message: 'Maximum of 10 Skills is allowed'})
		.optional()
		.refine((val) => val !== undefined, {
			message: 'At least one skill is required',
		}),
	tags: z
		.array(selectSchema)
		.min(1, {message: 'At least one Tag is required'})
		.max(3, {message: 'Maximum of 3 tags is allowed'})
		.optional()
		.refine((val) => val !== undefined, {
			message: 'At least one Tag is required',
		}),
	title: z
		.string({
			message: 'Title is required',
		})
		.min(1, 'Title is required'),
	vacancy_count: z
		.string({
			message: 'Vacancy is required',
		})
		.min(1, 'Vacancy is required'),
	featured: z
		.object({
			label: z.string().min(1, 'Label is required'),
			value: z.boolean(),
		})
		.optional()
		.refine((val) => val !== undefined, {
			message: 'Please select a featured Option',
		}),
	ap_deadline: z.date({
		message: 'Date is required',
	}),
});
