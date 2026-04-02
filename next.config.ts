import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "shop-phinf.pstatic.net" },
      { protocol: "https", hostname: "pub-9ef3c67b5bcf4b69bbd9e92d779eaa12.r2.dev" },
    ],
  },
};

export default nextConfig;
