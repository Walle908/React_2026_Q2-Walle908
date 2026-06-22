/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
const repoName = '/React_2026_Q2-Walle908';

const nextConfig = {
  // output: 'export',
  basePath: isProd ? repoName : undefined,
  assetPrefix: isProd ? `${repoName}/` : undefined,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        pathname: '/api/character/avatar/**',
      },
    ],
  },
};

export default nextConfig;
