/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		API_BASE_URL: process.env.API_BASE_URL,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
