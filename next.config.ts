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
  // Allow Replit's dev preview proxy origin (mTLS proxy with a different domain)
  allowedDevOrigins: [
    '*.replit.dev',
    '*.repl.co',
    '*.kirk.replit.dev',
    '*.picard.replit.dev',
    '*.janeway.replit.dev',
    '*.spock.replit.dev',
    '*.sisko.replit.dev',
    '*.riker.replit.dev'
  ],
};

export default nextConfig;
