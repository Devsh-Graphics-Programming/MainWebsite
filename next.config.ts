import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
        pathname: '/9.x/initials/**'
      },
      {
        protocol: 'https',
        hostname: 'graphics-programming.org',
        port: '',
        pathname: '/img/**'
      }
    ]
  },
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1'
  ],
};

export default nextConfig;
