import bcrypt from 'bcryptjs';

const hashPassword = async (plainPassword) => {
	const saltRounds = 10;
	try {
		const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
		return hashedPassword; // Return the hashed password
	} catch (err) {
		console.error('Error hashing password:', err);
		throw new Error('Password hashing failed');
	}
};

export default hashPassword;
