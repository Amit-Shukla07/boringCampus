import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enable styled-components support
    styledComponents: true,
  },
  images: {
    // Configure image optimization
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  // Environment variables
  env: {
    APP_NAME: 'Boring Campus',
    APP_DESCRIPTION: 'Management System for Boring Campus',
  },
  // Enable compression in production
  compress: true,
  // Enable ETag generation
  generateEtags: true,
  // Configure headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  // Enable experimental features
  experimental: {
    // Enable webpack optimizations
    optimizeCss: true,
  },
};

export default nextConfig;
