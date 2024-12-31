/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "forge-blush.vercel.app" }],
    domains: ["forge-blush.vercel.app", "127.0.0.1"],
  },
};

export default nextConfig;
