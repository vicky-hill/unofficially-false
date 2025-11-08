import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./sass']
  },
  env: {
    DOMAIN: process.env.DOMAIN,
    API_URL: process.env.API_URL,
    ENV: process.env.ENV
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io'
      }
    ]
  },
  reactStrictMode: false,
  devIndicators: false
};

export default nextConfig;
