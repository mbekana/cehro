import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/admin/api/:path*",
        destination: "http://localhost:5000/:path*", // Proxy to json-server
      },
    ];
  },
};

export default nextConfig;
