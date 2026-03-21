import type { NextConfig } from 'next';

const config: NextConfig = {
  // Transpile internal workspace packages
  transpilePackages: ['@club-manager/design-system'],
  // Enable React strict mode for better error detection
  reactStrictMode: true,
};

export default config;
