import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // The public site owns the root path "/", so no basePath.
};

export default nextConfig;
