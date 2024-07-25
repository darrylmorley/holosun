/** @type {import('next').NextConfig} */
import { withSentryConfig } from "@sentry/nextjs";

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
  images: {
    domains: ["res.cloudinary.com"],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Set this to true to ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  skipTrailingSlashRedirect: true,
  output: "standalone",
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

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "shooting-supplies",
  project: "holosun-optics",
  sentryUrl: "https://glitch.shootingsuppliesltd.co.uk/",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  // automaticVercelMonitors: true,
});

// export default nextConfig;
