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
    },
    routes: [
        { name: "Ana Sayfa", to: "/" },
        { name: "Hakkımda", to: "/about" },
        { name: "Projeler", to: "/projects" },
        { name: "İletişim", to: "/contact" }
    ]
};