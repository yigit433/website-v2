import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                non670: { max: "670px" },
                non910: { max: "910px" },
            },
            colors: {
                yigit433: {
                    icewhite: "#F1F6F9",
                    babyblue: "#C3E4F8",
                    nightblue: {
                        light: "#394867",
                        dark: "#212A3E",
                    },
                    grey: "#9BA4B5",
                },
            },
        },
    },
    plugins: [],
}

export default config