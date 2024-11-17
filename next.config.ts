import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disabling to use custom configuration
  },
};

export default nextConfig;
