import type { Config } from "tailwindcss";
// prettier-ignore

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  extend: {
    fontFamily: {
      sans: ["Archivo", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
  },
  daisyui: {
    themes: [
      {
        holosun: {
          primary: "#f9f9f9",
          secondary: "#161616",
          accent: "#ff3131",
          'accent-content': '#e40000',
          neutral: "#3d4451",
          "base-100": "#ffffff",

          "--rounded-box": "0.125rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.125rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        }
      },
    ],
  },
  plugins: [
    require("daisyui"),
  ],
};

export default config;
