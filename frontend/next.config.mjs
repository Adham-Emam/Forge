/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "forge-blush.vercel.app" }],
  },
};

export default nextConfig;
