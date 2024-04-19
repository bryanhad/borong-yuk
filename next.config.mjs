/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {hostname: 'https://github.com'}
        ]
    }
};

export default nextConfig;
