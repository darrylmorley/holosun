/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: "upgrade-insecure-requests",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Server",
    value: "Apache", // phony server value
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "sameorigin",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "geolocation=*", // allow specified policies here
  },
];

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  productionBrowserSourceMaps: false,
  reactStrictMode: process.env.NODE_ENV !== "production",
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    deviceSizes: [360, 640, 820, 1080, 1200, 1920],
    minimumCacheTTL: 600,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: "/shop/category/red-dots",
        destination: "/shop/category/red-dot-sights",
        permanent: true,
      },
      {
        source: "/holosun-he512t-gr-green-dot-sight",
        destination: "/shop/holosun-he512t-gr-green-dot-sight",
        permanent: true,
      },
      {
        source: "/holosun-407k-x2-6-moa-red-dot-reflex-sight",
        destination: "/shop/holosun-407k-x2-6-moa-red-dot-reflex-sight",
        permanent: true,
      },
      {
        source: "/holosun-aems-core-gr120101-green-reflex-sight",
        destination: "/shop/holosun-aems-core-gr120101-green-reflex-sight",
        permanent: true,
      },
      {
        source: "/holosun-hs515cm-red-dot-sight",
        destination: "/shop/holosun-hs515cm-red-dot-sight",
        permanent: true,
      },
      {
        source: "/holosun-ls117g-green-laser-aiming-device",
        destination: "/shop/holosun-ls117g-green-laser-aiming-device",
        permanent: true,
      },
      {
        source: "/holosun-hs403r-red-dot-sight",
        destination: "/shop/holosun-hs403r-red-dot-sight",
        permanent: true,
      },
      {
        source: "/holosun-rml-green-laser",
        destination: "/shop/holosun-rml-green-laser",
        permanent: true,
      },
      {
        source: "/holosun-he407c-gr-x2-green-dot-reflex-sight",
        destination: "/shop/holosun-he407c-gr-x2-green-dot-reflex-sight",
        permanent: true,
      },
      {
        source: "/holosun-set-hs510c-red-dot-and-hm3x-magnifier-and-hardcase",
        destination: "/shop/holosun-set-hs510c-red-dot-and-hm3x-magnifier-and-hardcase",
        permanent: true,
      },
      {
        source: "/holosun-510c-spacer",
        destination: "/shop/holosun-510c-spacer",
        permanent: true,
      },
      {
        source: "/holosun-he507c-grx2-reflex-sight",
        destination: "/shop/holosun-he507c-grx2-reflex-sight",
        permanent: true,
      },
      {
        source: "/holosun-407c-x2-2-moa-red-dot-solar-powered-reflex-sight",
        destination: "/shop/holosun-407c-x2-2-moa-red-dot-solar-powered-reflex-sight",
        permanent: true,
      },
      {
        source: "/holosun-407c507c508t-picatinny",
        destination: "/shop/holosun-407c507c508t-picatinny",
        permanent: true,
      },
      {
        source: "/holosun-he403c-gr-green-dot-sight",
        destination: "/shop/holosun-he403c-gr-green-dot-sight",
        permanent: true,
      },
      {
        source: "/holosun-hs510c-red-dot-reflex-sight",
        destination: "/shop/holosun-hs510c-red-dot-reflex-sight",
        permanent: true,
      },
      {
        source: "/holosun-aems-low-mount",
        destination: "/shop/holosun-aems-low-mount",
        permanent: true,
      },
      {
        source: "/holosun-aems-core-110101-red-reflex-sight",
        destination: "/shop/holosun-aems-core-110101-red-reflex-sight",
        permanent: true,
      },
      {
        source: "/holosun-aems-2moa-red-dot-sight",
        destination: "/shop/holosun-aems-2moa-red-dot-sight",
        permanent: true,
      },
      {
        source: "/holosun-aems-gr-221301-green-reflex-sight",
        destination: "/shop/holosun-aems-gr-221301-green-reflex-sight",
        permanent: true,
      },
      {
        source: "/holosun-scrs-gr-2-green-dot-sight",
        destination: "/shop/holosun-scrs-gr-2-green-dot-sight",
        permanent: true,
      },
      {
        source: "/holosun-he510c-gr-green-dot-reflex-sight",
        destination: "/shop/holosun-he510c-gr-green-dot-reflex-sight",
        permanent: true,
      },
      {
        source: "/holosun-le117-gr-green-laser-aiming-device",
        destination: "/shop/holosun-le117-gr-green-laser-aiming-device",
        permanent: true,
      },
      {
        source: "/holosun-hs507c-x2-red-dot-reflex-sight",
        destination: "/shop/holosun-hs507c-x2-red-dot-reflex-sight",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(module.exports, {
  org: "shooting-supplies",
  project: "holosun-optics",
  sentryUrl: "https://glitch.shootingsuppliesltd.co.uk/",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
});
