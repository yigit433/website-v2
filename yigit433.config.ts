export default {
    siteName: "yigit433",
    profilePicture: {
        src: "https://api.github.com/users/yigit433",
        field: "avatar_url"
    },
    personal: {
        name: "Yiğit",
        position: "Full-stack Developer",
        email: "yigitefeavc@gmail.com",
        description: "Hello 👋, I'm a student. I'm {age} years old now and I have some small projects. I spend more time from classes on my projects and cycling.",
        birthday: {
            day: process.env.NEXT_PUBLIC_BIRTHDAY,
            month: process.env.NEXT_PUBLIC_BIRTHMONTH,
            year: process.env.NEXT_PUBLIC_BIRTHYEAR,
            gmt: "GMT+3:00", // Europe/Istanbul GMT zone
            time: process.env.NEXT_PUBLIC_BIRTHTIME,
        },
        socialAccounts: [
            {
                icon: "/icons/medium.svg",
                color: "#ffffff",
                textColor: "#000000",
                name: "Medium",
                url: "https://medium.com/@yigit433",
            },
            {
                icon: "/icons/linkedin.svg",
                color: "#0077B5",
                textColor: "#ffffff",
                name: "LinkedIn",
                url: "https://www.linkedin.com/in/avcyigitefe/",
            },
            {
                icon: "/icons/github.svg",
                color: "#24292e",
                textColor: "#ffffff",
                name: "Github",
                url: "https://github.com/yigit433",
            },
            {
                icon: "/icons/discord.svg",
                color: "#7289da",
                textColor: "#ffffff",
                name: "Discord",
                accountId: "304347029046558721",
                url: "#",
            },
        ]
    },
    routes: [
        { name: "Home", to: "/" },
        { name: "About me", to: "/about-me" },
        { name: "Projects", to: "/projects" },
        { name: "Repositories", to: "/repositories" }
    ]
};