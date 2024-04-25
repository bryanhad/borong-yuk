/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: "https://github.com" },
            { hostname: "lh3.googleusercontent.com" },
        ],
    },
}

export default nextConfig
