/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output as standalone for Docker deployment
  output: "standalone",

  // Strict Next.js checks
  reactStrictMode: true,

  // Image optimization — allow Directus domain and local sources
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.asahome.example",
      },
    ],
    // Allow unoptimized images from Directus during dev
    unoptimized: process.env.NODE_ENV === "development",
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },

  // Redirect old or common paths if needed
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
