export const timeCategory = (postingDate) => {
	const now = new Date();
	const postedDate = new Date(postingDate);
	const diffInMilliseconds = now - postedDate;
	const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
	const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
	const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

	if (diffInHours < 1) {
		return `Last hour`;
	} else if (diffInDays < 1) {
		return `Last 24 hours`;
	} else if (diffInDays <= 7) {
		return `Last 7 days`;
	} else if (diffInDays <= 14) {
		return `Last 14 days`;
	} else if (diffInDays <= 30) {
		return `Last 30 days`;
	} else {
		return `Over 30 days`;
	}
};
