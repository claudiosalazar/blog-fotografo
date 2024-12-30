
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'prod',
  basePath: '',
  assetPrefix: process.env.ASSET_PREFIX,
};

export default nextConfig;