import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Every page is pre-rendered to static HTML: fast, crawlable, hostable anywhere.
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true }, // images are pre-optimised by scripts/optimize-images.mjs
};

export default nextConfig;
