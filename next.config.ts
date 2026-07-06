import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false, // Disables development overlay indicators to prevent telemetry/network crashes
  webpack: (config, { dev }) => {
    if (dev) {
      // Use memory cache in development to prevent filesystem write locks on Windows
      config.cache = {
        type: "memory",
      };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
