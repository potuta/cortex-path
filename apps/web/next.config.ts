import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@cortexpath/shared", "@cortexpath/database"],
  reactStrictMode: true,

  turbopack: {
    root: path.join(__dirname, "../.."),
  },
};

export default nextConfig;
