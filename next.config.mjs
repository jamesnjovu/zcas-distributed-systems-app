/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  output: 'export',
  basePath: isProd ? '/zcas-distributed-systems-app' : '',
  assetPrefix: isProd ? '/zcas-distributed-systems-app/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
