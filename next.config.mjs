/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "https://github.com" },
            { hostname: "ik.imagekit.io", pathname: "/borongyuk/**" },
        ],
    },
}

export default nextConfig
