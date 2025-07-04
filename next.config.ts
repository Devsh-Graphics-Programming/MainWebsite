import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
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
  }
};

export default nextConfig;
