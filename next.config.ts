import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  env: {
    // Year shown in prerendered HTML; see src/lib/use-current-year.ts.
    BUILD_YEAR: String(new Date().getFullYear()),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    // Files in /public are not content-hashed, so cache them for a week and
    // revalidate in the background rather than marking them immutable.
    const publicAssetCache = {
      key: "Cache-Control",
      value: "public, max-age=604800, stale-while-revalidate=86400",
    };
    return [
      { source: "/images/:path*", headers: [publicAssetCache] },
      { source: "/videos/:path*", headers: [publicAssetCache] },
      { source: "/icons/:path*", headers: [publicAssetCache] },
      { source: "/brochure/:path*", headers: [publicAssetCache] },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), geolocation=(), microphone=(self)",
          },
        ],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
