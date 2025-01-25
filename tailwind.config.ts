import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      mollieGlaston: "var(--font-mollie-glaston)",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "--neutral--white": "white",
        "--neutral--black": "#101010",
        "--primary--default": "#1d4339",
        "--accent--gold--light": "#e9cc95",
        "--neutral--dark-grey": "#5a5a5a",
        "--neutral--grey": "#9a9a9a",
        "--primary--focused": "#285e50",
        "--neutral--light-grey": "#e9e9e9",
        "--primary--selected": "#347866",
        "--accent--light": "var(--accent--mid-opal)",
        "--accent--mid-opal": "#d4e2dd4d",
        "--accent--mid": "#3f937c",
        "--opal": "#e9f0ee",
      },
    },
  },
  plugins: [],
};
export default config;
