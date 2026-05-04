import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@cortexpath/shared", "@cortexpath/database"],
};

export default nextConfig;
