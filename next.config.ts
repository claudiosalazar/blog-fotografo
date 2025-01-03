/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  distDir: 'prod',
  reactStrictMode: true,
  trailingSlash: true,
  output: 'export',
};

export default nextConfig;