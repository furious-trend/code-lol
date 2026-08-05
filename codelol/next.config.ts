import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow local network IP for HMR
  allowedDevOrigins: ['192.168.75.229'],
};

export default nextConfig;
