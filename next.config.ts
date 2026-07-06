import type { NextConfig } from "next";
import os from "os";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false, // Disables development overlay indicators to prevent telemetry/network crashes
  webpack: (config, { dev }) => {
    if (dev) {
      // Use OS temp directory for filesystem cache to prevent project-level write locks on Windows
      config.cache = {
        type: "filesystem",
        cacheDirectory: path.join(os.tmpdir(), "toolchi-webpack-cache"),
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
