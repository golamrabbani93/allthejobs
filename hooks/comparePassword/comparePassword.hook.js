import bcrypt from 'bcryptjs';

const comparePassword = async (enteredPassword, storedHash) => {
	try {
		const isMatch = await bcrypt.compare(enteredPassword, storedHash);
		return isMatch; // Return true if passwords match, false otherwise
	} catch (err) {
		console.error('Error comparing password:', err);
		throw new Error('Password comparison failed');
	}
};

export default comparePassword;
