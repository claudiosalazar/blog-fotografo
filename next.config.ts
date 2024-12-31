/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: process.env.ASSET_PREFIX,
  images: {
    domains: ['localhost'],
  },
};

export default nextConfig;