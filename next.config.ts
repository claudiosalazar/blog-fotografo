/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: process.env.ASSET_PREFIX,
  distDir: 'prod',
  images: {
    remotePatterns: [
      // {
      //   protocol: 'http',
      //   hostname: 'localhost',
      //   port: '3001',
      //   pathname: '/**',
      // },
      {
        protocol: 'https',
        hostname: 'blog-fotografo.claudiosalazar.cl',
        port: '',
        pathname: '/uploads/images/**',
      },
    ],
  },
  trailingSlash: true,
  output: 'export',
};

export default nextConfig;