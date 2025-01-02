export const timeAgoFromPosting = (postingDate) => {
	const now = new Date();
	const postedDate = new Date(postingDate);
	const diffInSeconds = Math.floor((now - postedDate) / 1000);

	if (diffInSeconds < 60) {
		return `${diffInSeconds} seconds ago`;
	} else if (diffInSeconds < 3600) {
		const minutes = Math.floor(diffInSeconds / 60);
		return `${minutes} minutes ago`;
	} else if (diffInSeconds < 86400) {
		const hours = Math.floor(diffInSeconds / 3600);
		return `${hours} hours ago`;
	} else if (diffInSeconds < 2592000) {
		const days = Math.floor(diffInSeconds / 86400);
		return `${days} days ago`;
	} else if (diffInSeconds < 31536000) {
		const months = Math.floor(diffInSeconds / 2592000);
		return `${months} months ago`;
	} else {
		const years = Math.floor(diffInSeconds / 31536000);
		return `${years} years ago`;
	}
};
