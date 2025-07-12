import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost:3000",
    "192.168.18.87:3000",
    "http://localhost:3000",
    "192.168.18.87",
  ],
};

export default nextConfig;
