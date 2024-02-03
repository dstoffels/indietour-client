/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		API_BASE_URL: process.env.API_BASE_URL,
		GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
