/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    cssnano: { preset: "default" },
  },
};

export default config;
