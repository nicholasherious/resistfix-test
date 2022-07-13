/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['resistbay.com', 'links.papareact.com'],
  },
};

module.exports = nextConfig;
