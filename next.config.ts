import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';


const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      '@prisma/client',
      '@prisma/adapter-libsql',
      'libsql',
      'prisma'
    ],
  },
  env: {
    DATABASE_TURSO_DATABASE_URL: process.env.DATABASE_TURSO_DATABASE_URL,
    DATABASE_TURSO_AUTH_TOKEN: process.env.DATABASE_TURSO_AUTH_TOKEN,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
