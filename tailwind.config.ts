import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
        backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        },
        screens: {
            '2xs': '320px',
            xs: '480px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        colors: {
            neutral: {
            50: '#EEF3F7',
            100: '#D1D6DB',
            300: '#838F9D',
            500: '#444B54',
            900: '#333333',
            white: '#FFFFFF',
            },
            primary: {
            50: '#E9F5FF',
            100: '#79C2FF',
            300: '#008BFF',
            500: '#0059B6',
            900: '#003F80',
            },
            success: {
            50: '#DCFDF7',
            100: '#B0EFE3',
            300: '#6CE4CC',
            500: '#0FB495',
            900: '#008169',
            },
            warning: {
            50: '#FEE6D7',
            100: '#F3A678',
            200: '#FB8D1D',
            300: '#E17D41',
            500: '#E26413',
            900: '#592300',
            },
            error: {
            50: '#FFDADA',
            100: '#FF9E9E',
            300: '#EF5D5D',
            500: '#FD2626',
            900: '#6C0000',
            },
            blue: '#005BBB',
            title: {
            50: '#070F2B',
            },
        },
    },
  },
  plugins: [],
};
export default config;
