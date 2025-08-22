import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "d1yjjnpx0p53s8.cloudfront.net",
      "d2bxzineatl84k.cloudfront.net",
      "picsum.photos", // <— necessário pro carrossel
    ],
  },
};

export default nextConfig;