import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false, // Disables development overlay indicators to prevent telemetry/network crashes
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable webpack filesystem caching on Windows to prevent ENOENT file-locking crashes during hot reloads
      config.cache = false;
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
