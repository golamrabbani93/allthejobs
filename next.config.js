/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['mamtaz.com', 'lh3.googleusercontent.com', 'cdn-icons-png.flaticon.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'cdn-icons-png.flaticon.com',
			},
		],
	},
};

module.exports = nextConfig;
