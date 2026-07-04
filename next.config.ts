import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false, // Disables development overlay indicators to prevent telemetry/network crashes
};

export default nextConfig;
