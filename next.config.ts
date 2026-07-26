import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';


const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@prisma/client",
    "prisma"
  ],
  poweredByHeader: false,
  turbopack: {
    root: process.cwd()
  }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
