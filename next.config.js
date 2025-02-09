/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			'mamtaz.com',
			'lh3.googleusercontent.com',
			'cdn-icons-png.flaticon.com',
			'allthejobsca.pythonanywhere.com',
			'randomuser.me',
			'https://res.cloudinary.com',
		],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'cdn-icons-png.flaticon.com',
			},
			{
				protocol: 'https',
				hostname: 'allthejobsca.pythonanywhere.com',
			},
			{
				protocol: 'https',
				hostname: 'via.placeholder.com',
			},
			{
				protocol: 'https',
				hostname: 'randomuser.me',
			},
		],
	},
};

module.exports = nextConfig;
