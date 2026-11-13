import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['uncognizant-keneth-hemeralopic.ngrok-free.dev'],
  outputFileTracingIncludes: {
    '/*': ['./public/logo.png'],
  },
  serverExternalPackages: ['@node-rs/argon2', '@prisma/adapter-pg', 'pg'],
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;
