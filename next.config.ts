import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["api-contract"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://monorepo-b5st.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
