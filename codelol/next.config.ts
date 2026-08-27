import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Allow local network IP for HMR
  allowedDevOrigins: ['192.168.75.229'],
  // Pin Turbopack's workspace root to this directory to prevent it from
  // walking up to the parent "code lol" directory (space in path breaks watchers).
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
