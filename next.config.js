/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'resistbay.com',
      'links.papareact.com',
      'res.cloudinary.com',
      'resist-zoo-bucket.s3.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
