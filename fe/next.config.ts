import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack is the default bundler in Next.js 16.
  // @solana/web3.js references Node built-ins; alias them to empty modules
  // so they don't break the client bundle.
  turbopack: {
    resolveAlias: {
      crypto: { browser: "crypto-browserify" },
      stream: { browser: "stream-browserify" },
      http: { browser: "stream-http" },
      https: { browser: "https-browserify" },
      zlib: { browser: "browserify-zlib" },
      url: { browser: "url" },
    },
  },
  // Keep webpack config as fallback for `next build --webpack`
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
        url: false,
      };
    }
    return config;
  },
};

export default nextConfig;
