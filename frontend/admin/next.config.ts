import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  // Serve the entire admin panel under /admin (e.g. /admin/login, /admin/products).
  basePath: "/admin",
  // Prepend the basePath to local public assets (see image-loader.js).
  images: {
    loader: "custom",
    loaderFile: "./image-loader.js",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
    
    turbopack: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  
};

export default nextConfig;
