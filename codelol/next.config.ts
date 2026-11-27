// agent-notes: { ctx: "Next.js configuration with route-scoped COOP/COEP headers", deps: ["vercel.json"], state: active, last: "sato@2026-11-26" }
import type { NextConfig } from "next";
import path from "path";

const WORKSPACE_ISOLATION_HEADERS = [
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Embedder-Policy",
    value: "credentialless",
  },
];

const nextConfig: NextConfig = {
  // Allow local network IP for HMR
  allowedDevOrigins: ['192.168.75.229'],
  // Pin Turbopack's workspace root to this directory to prevent it from
  // walking up to the parent "code lol" directory (space in path breaks watchers).
  turbopack: {
    root: path.resolve(__dirname),
  },
  async headers() {
    return [
      {
        source: "/problems/:path*",
        headers: WORKSPACE_ISOLATION_HEADERS,
      },
      {
        source: "/playground",
        headers: WORKSPACE_ISOLATION_HEADERS,
      },
      {
        source: "/learn",
        headers: WORKSPACE_ISOLATION_HEADERS,
      },
    ];
  },
};

export default nextConfig;
