/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [
			"images.unsplash.com",
			"www.kindacode.com",
			"avatars.githubusercontent.com",
			"lh3.googleusercontent.com",
			"res.cloudinary.com",
		],
	},
};

module.exports = nextConfig;
