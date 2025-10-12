/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/zcas-distributed-systems-app',
  assetPrefix: '/zcas-distributed-systems-app',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
