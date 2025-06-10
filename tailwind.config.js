/** @type {import('tailwindcss').Config} */

const config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
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
            screens: {
                "non940": { max: "940px" }
            }
        },
    },
    plugins: [],
}

module.exports = config;