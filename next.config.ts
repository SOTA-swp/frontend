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
      {
        source: "/ws-proxy/:path*",
        // WebSocketもHTTPと同じポート/ドメインで動くため、https指定でUpgradeヘッダーが転送されます
        destination: "https://monorepo-b5st.onrender.com/:path*", 
      },
    ];
  },
};

export default nextConfig;
