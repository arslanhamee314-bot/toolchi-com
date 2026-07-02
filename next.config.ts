import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // We can generate static exports if hosted on Hostinger without Node backend, but we have Node.js Express server capabilities.
  // Next.js handles routing out-of-the-box.
};

export default nextConfig;
